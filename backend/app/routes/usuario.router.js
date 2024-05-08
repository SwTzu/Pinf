const router = require('express').Router();


const { validarUsuario, crearUsuario, verDatosUsuario,login,logout} = require('../controllers/usuario.controller.js');


//Ruta de prueba
router.get("/",(req,res)=>{
    res.json({message:"Ruta de /usuario/ funcionando"});
});

// Ruta de validacion de usuario                    // DATOS JSON:
router.post("/validar",validarUsuario);             // {token, tipoUsuario}
router.post("/crear",crearUsuario);                 // {rut, password, telefono, correo, direccion, planEstudio, ingreso, tipoUsuario, nombre1, nombre2, apellido1, apellido2}

router.post("/verDatos",verDatosUsuario);           // {rut}
router.post("/login",login);                        // {rut, password}
router.post("/logout",logout);                      // {token}

module.exports = router;
