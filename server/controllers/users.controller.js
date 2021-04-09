const users = require("../data/users.json");
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password); // This would be Users.find({u}).then(checkPwdHash)
  if (!user) {
    return res.status(401).json({});
  }
  return res.json({
		access_token: jwt.sign({ user: { ...user, password: undefined } }, process.env.JWT_SECRET || "changeme", {
      expiresIn: "2d",
    }),
  });
};
