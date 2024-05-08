const router = require('express').Router();

const { validarEmpresa, crearEmpresa, listarEmpresas, buscarEmpresas, getEmpresa, verificarEmpresa, getEmpresas} = require('../controllers/empresa.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /empresa/ funcionando"});
});

// Ruta de validacion de empresa                // DATOS JSON: 
router.post("/validar",validarEmpresa);         // { "razonSocial": "nombreEmpresa" } 

//Ruta de creacion de Empresa
router.post("/crear",crearEmpresa);             // {rutEmpresa, razonSocial, ciudad, region, direccion, rubro}

// Rutas de listado de empresas
router.get("/listar",listarEmpresas);

router.get("/buscar", buscarEmpresas)           // ?razonSocial=nombreEmpresa (completo o incompleto)(como parametros query)

router.post("/getEmpresa", getEmpresa);        // { idSolicitud }    

router.put("/verificar", verificarEmpresa);    // { rutEmpresa }

router.post("/getEmpresas", getEmpresas); 

module.exports = router;