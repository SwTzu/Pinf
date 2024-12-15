const router = require('express').Router();

const { loginSupervisor, crearSupervisor, updateSupervisor,buscarSupervisor ,AllSolicitudes} = require('../controllers/supervisor.controller.js');

//Ruta de prueba
router.get("/",(req,res)=>{
	res.json({message:"Ruta de /supervisor/ funcionando"});
});

router.post("/crear",crearSupervisor); // {correo, rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo};
router.post("/login",loginSupervisor); // {correoSupervisor, password}
router.put("/update",updateSupervisor); // {rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo}
router.post("/buscar",buscarSupervisor); // {correoSupervisor}
router.post("/AllSolicitudes",AllSolicitudes); // {token}

module.exports = router;