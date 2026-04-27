const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("./middlewares/error.middleware");

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api", require("./routes/index"));

app.use(errorMiddleware);

module.exports = app;
