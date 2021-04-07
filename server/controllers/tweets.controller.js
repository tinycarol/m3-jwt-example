const tweets = require("../data/tweets.json");
const users = require("../data/users.json");

module.exports.list = (req, res, next) => {
	res.json(tweets.map(t => {
		t.user = users.find(u => u.id === t.user);
		delete t.user.password;
		return t;
	}));
};
