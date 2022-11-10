const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const auth = require("../middleware/auth");

router.post("/", auth, filesController.uploadFiles);

router.delete("/:id", filesController.deleteFile);

module.exports = router;
