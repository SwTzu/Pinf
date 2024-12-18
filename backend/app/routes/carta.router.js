const router = require('express').Router();

const {
    crearCarta,
    obtenerCarta
}= require('../controllers/carta.controller.js');

//Ruta de prueba
router.get("/", (req, res) => {
    res.json({message:"Ruta de /carta/ funcionando"});
});

router.post("/crear", crearCarta);
router.post("/obtener", obtenerCarta);

module.exports = router;
