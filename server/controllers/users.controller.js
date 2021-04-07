const users = require("../data/users.json");
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({});
	}
	delete user.password;
  return res.json({
    access_token: jwt.sign({ user }, process.env.JWT_SECRET || "changeme", {
      expiresIn: "7d",
    }),
  });
};
