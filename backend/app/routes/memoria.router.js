const router = require('express').Router();

const { uploadPdf ,upload,descargarPDF} = require('../controllers/memoria.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /memoria/ funcionando"});
});

//router.post("/crear",uploadPdf); 
router.post("/uploadMemoria",upload.single('file'),uploadPdf);// {idSolicitud,file};
router.post("/descargar",descargarPDF); // {idMemoria};

module.exports = router;