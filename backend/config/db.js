const mongoose = require("mongoose");
//Inidicamos que las variables de entorno se encuentra en el archivo .env
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB connected on: ${url}`);
  } catch (err) {
    console.log("There was an error");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
