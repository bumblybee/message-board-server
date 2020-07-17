const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");

router.get("/", threadController.getThread);

module.exports = router;
