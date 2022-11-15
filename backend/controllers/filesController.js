const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

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
  console.log(req.file);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log("Deleted file");
  } catch (err) {
    console.log(err);
  }
};

exports.downloadFile = async (req, res) => {
  const file = "uploads/" + req.params.file;
  res.download(file);
};
