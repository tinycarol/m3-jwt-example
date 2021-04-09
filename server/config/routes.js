const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");
const productsController = require("../controllers/products.controller");

module.exports = router;

router.post(
  "/auth",
  authMiddleware.isNotAuthenticated,
  usersController.authenticate
);

router.get(
  "/products",
  authMiddleware.isAuthenticated,
  productsController.list
);
