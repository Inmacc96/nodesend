const Links = require("../models/Links");
const shortid = require("shortid");

exports.createLink = async (req, res, next) => {
  // Revisar si hay errores

  // Crear un objeto de Enlace
  const { name_original, password } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.name_original = name_original;
  link.password = password;

  // Almacenar el enlace en la base de datos
  try {
    await link.save();
    res.json({ msg: `${link.url}` });
    return next();
  } catch (err) {
    console.log(err);
  }
};
