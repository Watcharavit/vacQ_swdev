const Hospital = require("../models/Hospital");

// @desc       get all hospitals
// @route      get /api/v1/hospitals
// @access     public
exports.getHospitals = async (req, res, next) => {
	try {
		let query;
		// copy req.query
		const reqQuery = { ...req.query };

		// fields to exclude
		const removeFields = ["select", "sort", "page", "limit"];
		// loop over remove fields and delete them from reqQuery
		removeFields.forEach((param) => delete reqQuery[param]);
		console.log(reqQuery);

		// create query string
		let queryStr = JSON.stringify(reqQuery);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
		query = Hospital.find(JSON.parse(queryStr)).populate("appointments");

		// select fields
		if (req.query.select) {
			const fields = req.query.select.split(",").join(" ");
			query = query.select(fields);
		}
		// sort
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("-createdAt");
		}
		// pagination
		const page = parseInt(req.query.page, 10) || 1; // page number
		const limit = parseInt(req.query.limit, 10) || 25; // amount in one page
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const total = await Hospital.countDocuments();
		query = query.skip(startIndex).limit(limit);

		//Executing query
		const hospitals = await query;

		//Pagination result
		const pagination = {};
		if (endIndex < total) {
			pagination.next = { page: page + 1, limit };
		}
		if (startIndex > 0) {
			pagination.prev = { page: page - 1, limit };
		}

		res.status(200).json({
			success: true,
			count: hospitals.length,
			pagination,
			data: hospitals,
		});
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc       get single hospital
// @route      get /api/v1/hospitals/:id
// @access     public
exports.getHospital = async (req, res, next) => {
	try {
		const hospital = await Hospital.findById(req.params.id);
		if (!hospital) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({ success: true, data: hospital });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc       create new hospital
// @route      post /api/v1/hospitals
// @access     private
exports.createHospital = async (req, res, next) => {
	const hospital = await Hospital.create(req.body);
	res.status(201).json({ success: true, data: hospital });
};

// @desc       update hospital
// @route      put /api/v1//:id
// @access     private
exports.updateHospital = async (req, res, next) => {
	try {
		const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!hospital) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({ success: true, data: hospital });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};

// @desc       delete hospital
// @route      delete /api/v1/hospitals/:id
// @access     private
exports.deleteHospital = async (req, res, next) => {
	try {
		const hospital = await Hospital.findById(req.params.id);
		if (!hospital) {
			return res.status(400).json({ success: false });
		}
		hospital.remove();
		res.status(200).json({ success: true, data: {} });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};
