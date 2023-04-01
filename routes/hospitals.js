const express = require("express");
const router = express.Router();
const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters } = require("../controllers/hospitals");
const { protect, authorize } = require("../middleware/auth");
const appointmentRouter = require("./appointments");

router.use("/:hospitalId/appointments/", appointmentRouter);

// using router.route() method allows you to define a route for a specific path and chain multiple HTTP methods to that route,
// while using router.get() method defines a route for a specific HTTP method on a specific path.
router.get("/vacCenters", getVacCenters);
router.route("/").get(getHospitals).post(protect, authorize("admin"), createHospital);
router.route("/:id").get(getHospital).put(protect, authorize("admin"), updateHospital).delete(protect, authorize("admin"), deleteHospital);

module.exports = router;
