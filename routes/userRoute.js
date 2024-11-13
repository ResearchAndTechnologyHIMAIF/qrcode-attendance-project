const express = require("express");
const {
  getUserRegistrationData,
  getUserAttendanceData,
} = require("../controllers/userController");
const router = express();

router.get("/register/data", getUserRegistrationData);
router.get("/attend/data", getUserAttendanceData);

module.exports = router;
