const {crearCoordinador,obtenerCoordinadores,editarCoordinador,eliminarCoordinador}=require('../controllers/coordinador.controller');

const router = require('express').Router();

router.post('/crear',crearCoordinador);
router.post('/obtener',obtenerCoordinadores);
router.post('/editar',editarCoordinador);
router.post('/eliminar',eliminarCoordinador);


module.exports = router;
