const router = require('express').Router();

const { loginSupervisor, crearSupervisor, updateSupervisor,buscarSupervisor ,AllSolicitudes, verificarCorreoYEnviarCodigo, verificarCodigoSupervisor, reestablecerPasswordSupervisor} = require('../controllers/supervisor.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /supervisor/ funcionando"});
});

router.post("/crear",crearSupervisor); // {correo, rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo};
router.post("/login",loginSupervisor); // {correoSupervisor, password}
router.put("/update",updateSupervisor); // {rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo}
router.post("/buscar",buscarSupervisor); // {correoSupervisor}
router.post("/AllSolicitudes",AllSolicitudes); // {token}
router.post("/verificarCorreo",verificarCorreoYEnviarCodigo); // {correoSupervisor}
router.post("/verificarCodigo", verificarCodigoSupervisor); // {correoSupervisor, codigo}
router.post("/reestablecerPassword", reestablecerPasswordSupervisor); // {correoSupervisor, password}

module.exports = router;