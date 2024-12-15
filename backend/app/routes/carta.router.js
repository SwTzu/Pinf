const router = require('express').Router();

const {
    crearCarta,
}= require('../controllers/carta.controller.js');

//Ruta de prueba
router.get("/", (req, res) => {
    res.json({message:"Ruta de /carta/ funcionando"});
});

router.post("/crear", crearCarta);

module.exports = router;
