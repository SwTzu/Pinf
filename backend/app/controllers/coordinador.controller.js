const db = require('../models');
const key = require('../config/const.js').JWT_SECRET;
const jwt = require('jsonwebtoken');
const TOKEN = require('../helpers/token.helpers.js');
const { MAIL_USER, PASS_USER, MAIL_PORT} = require('../config/const.js');
const nodemailer = require('nodemailer');

const crearCoordinador = async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "Token no recibido"});
    }else{
        try {
            const decoded = jwt.verify(token, key);
            if (decoded.tipoUsuario !== 2) {
                return res.status(403).json({message: "No tiene permisos para realizar esta acción"});
            }
            const {rut,
                password,
                telefono,
                correo,
                direccion,
                tipoUsuario,
                nombre1,
                nombre2,
                apellido1,
                apellido2,} = req.body;
            const usuario = await db.usuario.findOne({where: {rut: rut}});
            if (usuario) {
                return res.status(400).json({message: "Ya existe un usuario con ese rut"});
            }else if( 2>tipoUsuario || tipoUsuario>4){
                return res.status(400).json({message: "Tipo de usuario no valido"});
            }
            const pass = await TOKEN.passSUP(correo);
            const mailOptions = {
                from: MAIL_USER,
                to: correo,
                subject: `Se te ha creado una cuenta en la plataforma de practicas`,
                text: `Se te ha creado una cuenta en la plataforma de practicas, tu usuario es ${rut} y tu contraseña fue creada automaticamente la cual es: ${pass} `
            };
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
            
            transporter.sendMail(mailOptions);
            await db.usuario.create({
                rut: rut,
                password: password,
                telefono: telefono,
                correo: correo,
                password:pass,
                direccion: direccion,
                tipoUsuario: tipoUsuario,
                nombre1: nombre1,
                nombre2: nombre2,
                apellido1: apellido1,
                apellido2: apellido2,
            });
            return res.status(200).json({message: "Coordinador creado exitosamente"});
        } catch (error) {
            return res.status(500).json({message: "Error interno del servidor", error: error});
        }
    }
}

const obtenerCoordinadores = async (req, res) => {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message: "Token no recibido"});
    }else{
        try {
            const decoded = jwt.verify(token, key);
            if (decoded.tipoUsuario !== 2) {
                return res.status(403).json({message: "No tiene permisos para realizar esta acción"});
            }
            const coordinadores = await db.usuario.findAll({where: {tipoUsuario: [2, 3, 4]}});
            return res.status(200).json({coordinadores: coordinadores});
        } catch (error) {
            return res.status(500).json({message: "Error interno del servidor", error: error});
        }
    }
}

const editarCoordinador = async (req, res) => {
    const {token, rut, nombre1, nombre2, apellido1, apellido2, correo, telefono, direccion, tipoUsuario} = req.body;
    if (!token) {
        return res.status(400).json({message: "Token no recibido"});
    }
    try {
        const decoded = jwt.verify(token, key);
        if (decoded.tipoUsuario !== 2) {
            return res.status(403).json({message: "No tiene permisos para realizar esta acción"});
        }
        const usuario = await db.usuario.findOne({where: {rut: rut}});
        if (!usuario) {
            return res.status(404).json({message: "No existe un coordinador con ese rut"});
        }
        const fieldsToUpdate = { nombre1, nombre2, apellido1, apellido2, correo, telefono, direccion, tipoUsuario};
        Object.keys(fieldsToUpdate).forEach(field => {
            if (fieldsToUpdate[field] !== undefined) {
                usuario[field] = fieldsToUpdate[field];
            }
        });
        await usuario.save();
        return res.status(200).json({message: "Coordinador editado exitosamente", coordinador: usuario});
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor", error: error});
    }
}
const eliminarCoordinador = async (req, res) => {
    const {token, rut} = req.body;
    if (!token) {
        return res.status(400).json({message: "Token no recibido"});
    }
    try {
        const decoded = jwt.verify(token, key);
        if (decoded.tipoUsuario !== 2) {
            return res.status(403).json({message: "No tiene permisos para realizar esta acción"});
        }
        const usuario = await db.usuario.findOne({where: {rut: rut}});
        if (!usuario) {
            return res.status(404).json({message: "No existe un usuario con ese rut"});
        }
        if (usuario.tipoUsuario < 2 || usuario.tipoUsuario > 4) {
            return res.status(400).json({message: "Tipo de usuario no valido para eliminación"});
        }
        await usuario.destroy();
        return res.status(200).json({message: "Usuario administrativo eliminado exitosamente"});
    } catch (error) {
        return res.status(500).json({message: "Error interno del servidor", error: error});
    }
}
module.exports = {
    crearCoordinador,
    obtenerCoordinadores,
    editarCoordinador,
    eliminarCoordinador
}