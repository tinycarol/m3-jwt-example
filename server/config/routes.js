const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");
const tweetsController = require("../controllers/tweets.controller");

module.exports = router;

router.post(
  "/auth",
  authMiddleware.isNotAuthenticated,
  usersController.authenticate
);

router.get(
  "/tweets",
  authMiddleware.isAuthenticated,
  tweetsController.list
);
