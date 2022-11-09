const User = require("../models/User");

exports.createUser = async (req, res) => {
  // Verificar si el usuario existe
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Already registered user");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    await user.save();

    res.json({ msg: "User successfully created" });
  } catch (err) {
    console.log(err);
  }
};
