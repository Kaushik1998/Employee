const jwt = require("jsonwebtoken");
const { accessToken } = require("../config.json");

module.exports = function (req, res, next) {
  let header = req.headers.authorization;
  console.log(header);
  if (!header) {
    res.status(401).send("Authorization Headers Absent");
  }
  let token = header.split(" ")[1];
  if (!token) {
    res.status(401).send("Authorization Token Absent");
  }

  jwt.verify(token, accessToken, (err, result) => {
    if (err) {
      res.status(401).send("Token Invalid");
    }
    let { username } = req.body;
    if (username == result.username) {
      res.status(200).json({ message: "Valid Token" });
    } else {
      res.status(401).send("Invalid Username in Token");
    }
  });
};
