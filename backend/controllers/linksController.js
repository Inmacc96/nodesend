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

  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
  const { downloads, name } = link;
  if (downloads === 1) {
    // Eliminar el archivo
    req.file = name;
    next(); // Se va hacia el controlador de files a la función deleteFile

    // Eliminar la entrada de la bd
    await Links.findOneAndDelete({ url });
  } else {
    // Si las descargas son > a 1 - Restarle 1
    link.downloads--;
    await link.save();
  }
};
