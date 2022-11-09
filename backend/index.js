const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const linksRoutes = require("./routes/linksRoutes");

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar leer los valores de un body
app.use(express.json());

// Rutas de la app
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/links", linksRoutes);

// Puerto de la app
const port = process.env.PORT || 4000;

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
