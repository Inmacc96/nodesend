const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  // Revisar si hay errores
  // Buscar el usuario para ver si está registrado
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("The user doesn't exist");
    res.status(401).json({ msg: error.message });
    return next();
  }

  // Verificar el password y autenticar el usuario
  
};

exports.authenticatedUser = (req, res) => {};
