const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.authenticateUser = async (req, res, next) => {
  // Revisar si hay errores
  // Buscar el usuario para ver si está registrado
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("The user doesn't exist");
    res.status(401).json({ msg: error.message });
    return next();
  }

  // Verificar el password y autenticar el usuario
  if (bcrypt.compareSync(password, user.password)) {
    //Crear JWT
  } else {
    const error = new Error("The password is incorrect");
    res.status(401).json({ msg: error.message });
    return next();
  }
};

exports.authenticatedUser = (req, res) => {};
