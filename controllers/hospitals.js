const Hospital = require("../models/Hospital");

// @desc       get all hospitals
// @route      get /api/v1/hospitals
// @access     public
exports.getHospitals = async (req, res, next) => {
	try {
		const hospitals = await Hospital.find();
		res.status(200).json({
			success: true,
			count: hospitals.length,
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
		const hospital = await Hospital.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
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
		const hospital = await Hospital.findByIdAndDelete(req.params.id);
		if (!hospital) {
			return res.status(400).json({ success: false });
		}
		res.status(200).json({ success: true, data: {} });
	} catch (err) {
		res.status(400).json({ success: false });
	}
};
