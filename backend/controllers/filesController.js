const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Links = require("../models/Links");

exports.uploadFiles = async (req, res, next) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../uploads");
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, `${shortid.generate()}${extension}`);
    },
  });

  const settingMulter = {
    //Limit 1 megabyte y si está autenticado 1024*1024*10
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: fileStorage,
  };

  const upload = multer(settingMulter).single("file");

  //Aquí se sube el archivo y en caso de que no haya error le muesta el nombre del archivo
  // y en otro caso, le muestra el error y salta al siguiente middleware
  upload(req, res, async (err) => {
    if (!err) {
      res.json({ file: req.file.filename });
    } else {
      console.log(err);
      return next();
    }
  });
};

exports.deleteFile = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log("Deleted file");
  } catch (err) {
    console.log(err);
  }
};

exports.downloadFile = async (req, res, next) => {
  const { file } = req.params;

  // Descarga del archivo
  const fileRoute = "uploads/" + file;
  res.download(fileRoute);

  // Eliminar el archivo y la entrada de la base de datos
  // Obtiene el enlace
  const link = await Links.findOne({ name: file });

  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
  const { downloads, name, id } = link;
  if (downloads === 1) {
    // Eliminar el archivo
    req.file = name;
    next(); // Se va hacia el controlador de files a la función deleteFile

    // Eliminar la entrada de la bd
    await Links.findOneAndDelete(id);
  } else {
    // Si las descargas son > a 1 - Restarle 1
    link.downloads--;
    await link.save();
  }
};
