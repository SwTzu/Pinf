const router = require('express').Router();

const { loginSupervisor, crearSupervisor, updateSupervisor,buscarSupervisor } = require('../controllers/supervisor.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /supervisor/ funcionando"});
});

router.post("/crear",crearSupervisor); // {correo, rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo};
router.post("/login",loginSupervisor); // {rutEmpresa, password}
router.put("/update",updateSupervisor); // {rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo}
router.post("/buscar",buscarSupervisor); // {correoSupervisor}

module.exports = router;