const router = require('express').Router();

const { crearInforme } = require('../controllers/informe.controller.js');
const { obtenerInforme } = require('../controllers/informe.controller.js');
const { obtenerTodos } = require('../controllers/informe.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /informe/ funcionando"});
});

router.post("/crear",crearInforme); // {idSolicitud,documento,fechaEnvio};
router.get("/obtener",obtenerInforme); // {idSolicitud};
router.get("/getAll",obtenerTodos);

module.exports = router;