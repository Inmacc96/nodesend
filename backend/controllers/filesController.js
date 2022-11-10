const multer = require("multer");
const shortid = require("shortid");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../uploads");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${shortid.generate()}.${extension}`);
  },
});

const settingMulter = {
  limits: { fileSize: 1024 * 1024 },
  storage: fileStorage,
};

const upload = multer(settingMulter).single("file");

exports.uploadFiles = async (req, res, next) => {
  //Aquí se sube el archivo y en caso de que no haya error le muesta el nombre del archivo
  // y en otro caso, le muestra el error y salta al siguiente middleware
  upload(req, res, async (err) => {
    console.log(req.file);

    if (!err) {
      res.json({ file: req.file.filename });
    } else {
      console.log(err);
      return next();
    }
  });
};

exports.deleteFile = async (req, res) => {};
