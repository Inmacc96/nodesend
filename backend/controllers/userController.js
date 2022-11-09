const User = require("../models/User");

exports.createUser = async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  await user.save();

  res.json({ msg: "User successfully created" });
};
