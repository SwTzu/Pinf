const express = require("express");
const cors = require("cors");
const db = require("./app/models/index.js");
const app = express();
const values = require('./app/config/const.js');

app.use(cors({
  origin: 'http://localhost:80', // Cambia según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Actualización de base de datos lista.");
});

app.get("/", (req, res) => {
  res.json({ message: "Aplicacion funcionando." });
});

// Importacion de Router principal
require('./app/routes/main.router')(app)

const PORT = values.RUN_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
