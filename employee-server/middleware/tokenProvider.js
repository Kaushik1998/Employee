const jwt = require("jsonwebtoken");
const { accessToken } = require("../config.json");

module.exports = function (req, res, next) {
  const { username } = req.body;
  const token = jwt.sign({ username }, accessToken);
  res.status(200).json({ accessToken: token, username });
};
