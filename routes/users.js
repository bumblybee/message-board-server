var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => res.send("users"));
router.post("/create", userController.signupUser);

module.exports = router;
