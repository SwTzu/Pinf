const router = require('express').Router();

const { uploadPdf } = require('../controllers/memoria.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /memoria/ funcionando"});
});

router.post("/crear",uploadPdf); // {idSolicitud,documento,fechaEnvio};

module.exports = router;