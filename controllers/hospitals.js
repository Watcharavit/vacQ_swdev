// @desc       get all hospitals
// @route      get /api/v1/hospitals
// @access     public
exports.getHospitals = (req,res,next) => {
    res.status(200).json({success:true, msg:"show all hospitals"});
};

// @desc       get single hospital
// @route      get /api/v1/hospitals/:id
// @access     public
exports.getHospital = (req,res,next) => {
    res.status(200).json({success:true, msg:`show hospitals ${req.params.id}`});
};

// @desc       create new hospital
// @route      post /api/v1/hospitals
// @access     private
exports.createHospital = (req,res,next) => {
    res.status(200).json({success:true, msg:"create new hospital"});
};

// @desc       update hospital
// @route      put /api/v1//:id
// @access     private
exports.updateHospital = (req,res,next) => {
    res.status(200).json({success:true, msg:`update hospital ${req.params.id}`});
};

// @desc       delete hospital
// @route      delete /api/v1/hospitals/:id
// @access     private
exports.deleteHospital = (req,res,next) => {
    res.status(200).json({success:true, msg: `delete hospital ${req.params.id}`});
};