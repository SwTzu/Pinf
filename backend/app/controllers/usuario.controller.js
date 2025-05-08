const db = require("../models");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const tokenfunc = require('../helpers/token.helpers.js');
const key = require('../config/const.js').JWT_SECRET;
const jwt = require('jsonwebtoken');
const { MAIL_USER, PASS_USER, MAIL_PORT} = require('../config/const.js');
const verificationCodes = new Map(); // rut -> { code, timeoutId }
const verifiedRuts = new Set(); // rut ya verificado

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: PASS_USER,
  },
});
exports.transporter = transporter;

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

      const usuario = await db.usuario.findOne({ where: { rut: rut ,verificado:true} });
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
    correo,
    nombre
  } = req.body;

  const usuarioCheck = await db.usuario.findOne({ where: { rut: rut } });
  const [nombre1, nombre2, apellido1, apellido2] = nombre.split(" ");
  if (usuarioCheck) {
    return res.status(400).json({
      message: "El usuario ya existe.",
    });
  }

  try {

    const usuario = await db.usuario.create({
      rut: rut,
      password: password,
      correo: correo,
      tipoUsuario: 1,
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

const verificarUsuario = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, key);
    const usuario = await db.usuario.findOne({ where: { rut: decoded.rut } });
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }
    usuario.tokenVerificacion=null;
    usuario.verificado = true;

    await usuario.save();
    
    return res.status(200).json({
      message: "Usuario verificado exitosamente.",
      usuario: usuario,
    });

  } catch (error) {
    
    return res.status(500).json({
      message: "Error al verificar usuario.",
      error: error,
    });
  }
}

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

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
}

const verificarRutYEnviarCodigo = async (req, res) => {
  const { rut } = req.body;

  try {
    let usuario = await db.usuario.findOne({ where: { rut } });

    if (!usuario && !req.body.correo) {
      return res.status(404).json({ message: "No existe usuario con ese rut." });
    }else{

      usuario = {correo: req.body.correo};
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Limpiar código anterior si existe
    if (verificationCodes.has(rut)) {
      clearTimeout(verificationCodes.get(rut).timeoutId);
      verificationCodes.delete(rut);
    }
    const timeoutId = setTimeout(() => verificationCodes.delete(rut), 10 * 60 * 1000); // 10 min
    verificationCodes.set(rut, { code, timeoutId });

    const mailOptions = {
      from: MAIL_USER,
      to: usuario.correo,
      subject: "Código de recuperación de contraseña - Supervisor",
      text: `Tu código es: ${code}. Válido por 10 minutos.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error enviando correo:', error);
        return res.status(500).json({ message: "Error al enviar el correo.", error });
      } else {
        console.log('Correo enviado correctamente:', info.response);
        return res.status(200).json({
          message: "Supervisor encontrado. Código enviado al correo."
        });
      }
    });

  } catch (error) {
    console.error("Error al procesar solicitud:", error);
    return res.status(500).json({ message: "Error al procesar la solicitud.", error });
  }
};

const verificarCodigoRecuperacion = async (req, res) => {
  const { rut, codigo } = req.body;

  const data = verificationCodes.get(rut);
  if (!data) {
    return res.status(400).json({ message: "No se encontró un código para este rut o ya expiró." });
  }

  if (data.code !== codigo) {
    return res.status(400).json({ message: "Código incorrecto." });
  }

  clearTimeout(data.timeoutId);
  verificationCodes.delete(rut);
  verifiedRuts.add(rut);

  setTimeout(() => verifiedRuts.delete(rut), 10 * 60 * 1000); // limpiar permiso a los 10 min

  return res.status(200).json({ message: "Código verificado. Puedes reestablecer tu contraseña." });
};

const reestablecerPassword = async (req, res) => {
  const { rut, nuevaPassword } = req.body;

  if (!verifiedRuts.has(rut)) {
    return res.status(403).json({ message: "No autorizado. Verifica primero el código." });
  }

  try {
    const usuario = await db.usuario.findOne({ where: { rut } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    usuario.password = nuevaPassword;
    await usuario.save();

    verifiedRuts.delete(rut);

    return res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar contraseña.", error });
  }
};

module.exports = {
    validarUsuario,
    crearUsuario,
    verDatosUsuario,
    updateUsuario,
    login,
    logout,
    verificarUsuario,
    verificarRutYEnviarCodigo,
    verificarCodigoRecuperacion,
    reestablecerPassword,
};