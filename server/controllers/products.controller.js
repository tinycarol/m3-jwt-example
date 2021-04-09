const product = require("../data/products.json");
const users = require("../data/users.json");

module.exports.list = (req, res, next) => {
  console.log(users);
  res.json(
    product.map((p) => {
      const user = { ...users.find((u) => u.id === p.user) };
      delete user.password;
      return { ...p, user };
    })
  );
};
