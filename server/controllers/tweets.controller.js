const tweets = require("../data/tweets.json");
const users = require("../data/users.json");

module.exports.list = (req, res, next) => {
  console.log(users);
  res.json(
    tweets.map((t) => {
      console.log(t);
      const user = { ...users.find((u) => u.id === t.user) };
      delete user.password;
      return { ...t, user };
    })
  );
};
