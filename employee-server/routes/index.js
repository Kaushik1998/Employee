var express = require("express");
var router = express.Router();
const { login, register } = require("../middleware/authenticate");
const tokenProvider = require("../middleware/tokenProvider");
const tokenAuthenticate = require("../middleware/tokenAuthenticate");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("This is homepage");
});

router.route("/register").post(register);

router.route("/login").post(login, tokenProvider);

router.route("/token").post(tokenAuthenticate);

module.exports = router;
