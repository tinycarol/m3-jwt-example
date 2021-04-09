require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("./config/cors.config");
const jwt = require("jsonwebtoken");

/**
 * Configure express
 */
const app = express();

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.use(cors);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, _, next) => {
	const authHeader = req.header("Authorization");
  jwt.verify(
    authHeader ? authHeader.split(" ")[1] : "",
    process.env.JWT_SECRET,
    (error, decoded) => {
      console.log(error);
      if (decoded) {
        req.currentUser = decoded.user;
        // maybe get user from DB to get updated data? shouldn't be necessary with short expiration in tokens
      }
      next();
    }
  );
});

/**
 * Configure routes
 */
const router = require("./config/routes.js");
app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  console.error("-" * 1000);
  console.error(error);

  res.status(error.status || 500);

  const data = {};

  data.message = error.message;
  res.json(data);
});

/**
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Helper functions

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
