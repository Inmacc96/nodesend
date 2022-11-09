const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("email", "Add a email valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  authController.authenticateUser
);

router.get("/", authController.authenticatedUser);

module.exports = router;
