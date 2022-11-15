const express = require("express");
const router = express.Router();
const linksController = require("../controllers/linksController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("name", "Upload a file").not().isEmpty(),
    check("name_original", "Upload a file").not().isEmpty(),
  ],
  auth,
  linksController.createLink
);

router.get("/", linksController.getAllLinks);

router.get("/:url", linksController.checkPassword, linksController.getLink);

module.exports = router;
