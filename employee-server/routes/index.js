var express = require("express");
var router = express.Router();
const { login, register } = require("../middleware/authenticate");
const tokenProvider = require("../middleware/tokenProvider");
const tokenAuthenticate = require("../middleware/tokenAuthenticate");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/*", function (req, res, next) {
    res.sendFile(path.join(__dirname + "dist/Employee/index.html"));
});

router.route("/register").post(register);

router.route("/login").post(login, tokenProvider);

router.route("/token").post(tokenAuthenticate);

module.exports = router;
