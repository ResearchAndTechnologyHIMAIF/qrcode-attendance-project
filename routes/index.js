const express = require("express");
const app = express();
const registRoutes = require("./registRoute");
const userRoutes = require("./userRoute");
const attendRoutes = require("./attendRoute");
const sendQRRoutes = require("./sendQRRoute");

const API = "/api/v1";

app.get("/", (req, res) => {
  res.send({ message: "App is listening" });
});

app.use(API, registRoutes);
app.use(API, attendRoutes);
app.use(API, userRoutes);
app.use(API, sendQRRoutes);

module.exports = app;
