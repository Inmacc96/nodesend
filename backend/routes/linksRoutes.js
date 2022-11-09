const express = require("express");
const router = express.Router();
const linksController = require("../controllers/linksController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post("/", auth, linksController.createLink);

module.exports = router;
