const express = require("express");
const { sendQR } = require("../controllers/sendQRController");
const router = express();

router.get("/sendQR", sendQR);

module.exports = router;
