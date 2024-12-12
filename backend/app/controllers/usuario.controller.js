const db = require("../models");

const tokenfunc = require('../helpers/token.helpers.js');
const key = require('../config/const.js').JWT_SECRET;
const jwt = require('jsonwebtoken');

// TO-DO: Implementar seguridad de passwords, requiere implementacion en front y back. (Hashing, salting, etc.)

const logout = async (req,res) => {
    const token = req.body.token.toString();
    if (token){
        try {
            const response = await tokenfunc.blacklist(token);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

const login = async (req, res) => {
  try {
    let { rut, password, userType} = req.body;

    switch(userType){
      case 'est':
        userType=1;
        break;
      case 'coo':
        userType=2;
        break;
      case 'adm':
        userType=3;
        break;
      case 'boss':
        userType=4;
        break;
      default:
        userType=0;
        break;
      }

      const usuario = await db.usuario.findOne({ where: { rut: rut } });
      
      if (!usuario || usuario.password !== password || usuario.tipoUsuario !== userType) {
        return res.status(404).json({ message: "Credenciales incorrectas." });
      }


      const token = await tokenfunc.generateToken(usuario);
      return res.status(200).json({
        message: "Usuario validado exitosamente.",
        token: token
      });
      
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor",error:error});
    }
};

const crearUsuario = async (req, res) => {
  const {
    rut,
    password,
    telefono,
    correo,
    direccion,
    planEstudio,
    ingreso,
    tipoUsuario,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
  } = req.body;

  const usuarioCheck = await db.usuario.findOne({ where: { rut: rut } });

  if (usuarioCheck) {
    return res.status(400).json({
      message: "El usuario ya existe.",
    });
  }

  try {
    const usuario = await db.usuario.create({
      rut: rut,
      password: password,
      telefono: telefono,
      correo: correo,
      direccion: direccion,
      planEstudio: planEstudio,
      ingreso: ingreso,
      tipoUsuario: tipoUsuario,
      nombre1: nombre1,
      nombre2: nombre2,
      apellido1: apellido1,
      apellido2: apellido2,
    });

    return res.status(200).json({
      message: "Usuario creado exitosamente.",
      usuario: usuario,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al crear usuario.",
      error: err,
    });
  }
};
const validarUsuario = async (req,res) => {             // Para que se usara a comparacion del login?
    const {token,tipoUsuario} = req.body;
    if (token){
        try {
            const validartoken = await tokenfunc.validarToken(token,tipoUsuario);
            return res.status(200).json(validartoken);
        } catch (error) {
            return res.status(500).json(validarUsuario);
        }

    }
};
const getdata = async (req, res) => {
  const { token } = req.body;
  try {
    const { rut } = jwt.verify(token, key);
    const usuario = await db.usuario.findOne({ where: { rut: rut } ,attributes: { exclude: ['password'] },});

    if (!usuario) {
      return res.status(404).json({
        message: "No se encontró el usuario.",
      });
    }

    return res.status(200).json({
      message: "Datos del usuario obtenidos exitosamente.",
      usuario: usuario,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error al obtener datos del usuario.",
      error: err,
    });
  }
};


const verDatosUsuario = async (req, res) => {
  const { token } = req.body;
  const { rut } = await jwt.verify(token, key);
  const usuario = await db.usuario.findOne({ where: { rut: rut } });

  if (!usuario) {
      return res.status(404).json({
          message: "Usuario no encontrado."
      });
  }

  // Destructure the user object and exclude the password field
  const { password, ...usuarioSinPassword } = usuario.dataValues;

  return res.status(200).json({
      message: "Usuario encontrado.",
      usuario: usuarioSinPassword
  });
};

const updateUsuario = async (req, res) => {
  const { token, datos } = req.body;

  try {

    const decoded = await jwt.verify(token, key);
    console.log(decoded); // Muestra la estructura completa del token
    const { rut } = decoded;
  
    // Verifica que rutToken no sea undefined
    if (!rut) {
      return res.status(400).json({
        message: "El token no contiene un rut válido."
      });
    }

    const usuario = await db.usuario.findOne({ where: { rut: rut } });
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado."
      });
    }

    // Actualiza solo los campos que han cambiado
    usuario.nombre1 = datos.nombre1 || usuario.nombre1;
    usuario.nombre2 = datos.nombre2 || usuario.nombre2;
    usuario.apellido1 = datos.apellido1 || usuario.apellido1;
    usuario.apellido2 = datos.apellido2 || usuario.apellido2;
    usuario.telefono = datos.telefono || usuario.telefono;
    usuario.correo = datos.correo || usuario.correo;
    usuario.direccion = datos.direccion || usuario.direccion;
    usuario.planEstudio = datos.planEstudio || usuario.planEstudio;
    usuario.ingreso = datos.ingreso || usuario.ingreso;

    // Este método solo actualiza los campos que han sido modificados
    await usuario.save();

    return res.status(200).json({
      message: "Usuario actualizado exitosamente.",
      usuario: usuario
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar usuario.",
      error: error.message
    });
  }
};




module.exports = {
    validarUsuario,
    crearUsuario,
    verDatosUsuario,
    updateUsuario,
    login,
    logout
};