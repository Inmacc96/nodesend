const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const { validationResult } = require("express-validator");

exports.authenticateUser = async (req, res, next) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } else {
    const error = new Error("The password is incorrect");
    res.status(401).json({ msg: error.message });
    return next();
  }
};

exports.authenticatedUser = (req, res) => {};
