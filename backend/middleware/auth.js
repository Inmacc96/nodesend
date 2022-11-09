const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // Obtener el Token
    const token = authHeader.split(" ")[1];

    // Comprobar el JWT
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (err) {
      const error = new Error("Token invalid");
      return res.status(401).json({ msg: error.message });
    }
  }
  return next();
};
