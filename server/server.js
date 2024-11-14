require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const { logger } = require("./middlewares/logger");
const { handlingError } = require("./middlewares/handlingError");
const routerAPI = require("./routes/index");
const app = express();

app.use(express.json()).use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);
app.use(handlingError);

app.use(routerAPI);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
