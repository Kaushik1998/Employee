const bcrypt = require("bcrypt");
let users = [];

let registerAuthenticate = async function (req, res, next) {
  let { username, password } = req.body;
  console.log(username, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    res.status(201).json(user);
  } catch {
    res.status(500).send("Request Error");
  }
};

let loginAuthenticate = async function (req, res, next) {
  const { name, password } = req.body;
  const user = users.find((user) => user.name === name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      next();
    } else {
      res.status(403).send("Wrong Password");
    }
  } catch {
    res.status(500).send("Request Error");
  }
};

module.exports = { login: loginAuthenticate, register: registerAuthenticate };
