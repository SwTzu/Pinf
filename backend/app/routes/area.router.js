const router = require('express').Router();

const {
    listarAreas,
    crearArea,
    buscarArea
}= require('../controllers/area.controller.js');

//Ruta de prueba
router.get("/", (req, res) => {
    res.json({message:"Ruta de /area/ funcionando"});
});

router.get("/listar", listarAreas);
router.post("/crear", crearArea);
router.get("/buscar", buscarArea);

module.exports = router;
