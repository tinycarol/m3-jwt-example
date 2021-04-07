const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.currentUser) {
    next(createError(401));
  } else {
    next();
  }
};
