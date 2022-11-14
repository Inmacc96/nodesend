const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const linksRoutes = require("./routes/linksRoutes");
const filesRoutes = require("./routes/filesRoutes");

// Crear el servidor
const app = express();

// Conectar a la base de datos
const whiteList = [process.env.FRONTEND_URL];

connectDB();

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      // No está permitido el request
      callback(new Error("Error CORS"));
    }
  },
};

// Habilitar CORS
app.use(cors(corsOptions));

// Habilitar leer los valores de un body
app.use(express.json());

// Rutas de la app
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/links", linksRoutes);
app.use("/api/files", filesRoutes);

// Puerto de la app
const port = process.env.PORT || 4000;

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
