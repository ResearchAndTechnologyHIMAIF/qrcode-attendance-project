const express = require("express");
const { registUser } = require("../controllers/registController");
const router = express();

router.post("/regist", registUser);

module.exports = router;
