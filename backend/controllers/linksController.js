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
  const { name_original, name } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = name;
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
    /* console.log(link); */
    res.json({ msg: `${link.url}` });
    return next();
  } catch (err) {
    console.log(err);
  }
};

// Obtiene un listado de todos los enlaces
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Links.find({}).select("url -_id");
    res.json({ links });
  } catch (err) {
    console.log(err);
  }
};

// Obtener el enlace
exports.getLink = async (req, res, next) => {
  const { url } = req.params;
  // Verificar si existe el enlace
  const link = await Links.findOne({ url });

  if (!link) {
    const error = new Error("This link doesn't exist");
    res.status(404).json({ msg: error.message });
    return next();
  }

  // Si el enlace existe
  res.json({ file: link.name });
};
