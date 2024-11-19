const express = require("express");
const { attendUser } = require("../controllers/attendController");
const router = express();

router.post("/attend", attendUser);

module.exports = router;
