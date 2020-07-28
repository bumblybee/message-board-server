const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/isAuth");
const threadController = require("../controllers/threadController");

router.get("/", threadController.getThread);

module.exports = router;
