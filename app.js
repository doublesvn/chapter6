require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const app = express();

const { HTTP_PORT = 3000 } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

const server = app.listen(HTTP_PORT, () => {
  // console.log(`Server is running on port ${HTTP_PORT}`);
});

module.exports = server;
