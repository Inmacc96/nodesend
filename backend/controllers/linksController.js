const Links = require("../models/Links");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createLink = async (req, res, next) => {
  // Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Crear un objeto de Enlace
  const { name_original } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.name_original = name_original;

  // Si el usuario está autenticado

  if (req.user) {
    const { password, downloads } = req.body;

    //Asignar a enlace el nº de descargas
    if (downloads) {
      link.downloads = downloads;
    }

    // Asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    // Asignar el autor
    link.author = req.user.id;
  }

  // Almacenar el enlace en la base de datos
  try {
    await link.save();
    console.log(link);
    res.json({ msg: `${link.url}` });
    return next();
  } catch (err) {
    console.log(err);
  }
};
