const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  // Verificar si el usuario existe
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Already registered user");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Crear un nuevo usuario
    const user = new User(req.body);

    //Hashear el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: "User successfully created" });
  } catch (err) {
    console.log(err);
  }
};
