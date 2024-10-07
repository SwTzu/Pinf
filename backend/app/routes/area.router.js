const router = require('express').Router();

const { listarAreas } = require('../controllers/area.controller.js');

//Ruta de prueba
router.get("/", (req, res) => {
    res.json({message:"Ruta de /area/ funcionando"});
});

router.get("/listar", listarAreas);
