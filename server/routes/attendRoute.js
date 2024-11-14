const express = require("express");
const { attendUser } = require("../controllers/attendController");
const router = express();

router.get("/attend", attendUser);

module.exports = router;
