const User = require("../models/User");

// @desc       register user
// @route      post /api/auth/register
// @access     public
exports.register = (req, res, next) => {
	res.status(200).json({ success: true });
};

exports.register = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;
		// Create user
		const user = await User.create({ name, email, password, role });
		// Using cookies instead of pure token
		sendTokenResponse(user, 200, res);
	} catch (err) {
		res.status(400).json({ success: false });
		console.log(err.stack);
	}
};

// @desc Login user
// @route POST /api/vilaut-'login
// @access Public
exports.login = async (reg, res, next) => {
	try {
		const { email, password } = reg.body;
		// Validate email and password
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				msg: "Please provide an email and password"
			});
		}

		//Check for user
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(400).json({
				success: false,
				msg: "Invalid credentials"
			});
		}

		//Check if password match
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				msg: "Invalid credentials"
			});
		}

		// Create token
		sendTokenResponse(user, 200, res);
	} catch (error) {
		return res.status(400).json({
			success: false,
			msg: error.message
		});
	}
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	//create token
	const token = user.getSignedJWTToken();
	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	};

	if (process.env.NODE_ENV === "production") {
		options.secure = true;
	}
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		//add for frontend
		_id: user._id,
		name: user.name,
		email: user.email,
		//end for frontend
		token
	});
};

//@desc Get current Logged in user
//@route POST /api/v1/auth/me
//@access Private

exports.getMe = async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({ success: true, data: user });
};

//@desc Log user out / clear cookie
//@route GET /api/v1/auth/logout
//@access Private
exports.logout = async (req, res, next) => {
	res.cookie("token", "none", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});
	res.status(200).json({
		success: true,
		data: {}
	});
};
