const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Rutas de la app
app.use("/api/users", userRoutes);

// Puerto de la app
const port = process.env.PORT || 4000;

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
