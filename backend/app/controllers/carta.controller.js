const nodemailer = require("nodemailer");
const db = require("../models");
const MAIL_USER = require('../config/const.js').MAIL_USER;
const PASS_USER = require('../config/const.js').PASS_USER;
const Op = db.Sequelize.Op;

const crearCarta = async (req, res) => {
    const { 
        idSolicitud, 
        correoSupervisor, 
        tareas, 
        fechaInicio, 
        fechaTermino 
    } = req.body;
    try {
        // Convertir fechaInicio y fechaTermino del formato DD-MM-YYYY a YYYY-MM-DD HH:mm:ss
        const convertirFecha = (fecha) => {
            console.log(fecha);
            const [dia, mes, anio] = fecha.split('/'); // Dividir DD-MM-YYYY
            return `${anio}-${mes}-${dia}`; // Crear formato YYYY-MM-DD HH:mm:ss
        };

        const fechaInicioFormatted = convertirFecha(fechaInicio);
        const fechaTerminoFormatted = convertirFecha(fechaTermino);

        // Validar que las fechas sean correctas
        if (isNaN(new Date(fechaInicioFormatted).getTime()) || isNaN(new Date(fechaTerminoFormatted).getTime())) {
            return res.status(400).json({
                message: "Las fechas proporcionadas no son válidas."
            });
        }

        // Crear la carta con los datos procesados
        const carta = await db.carta.create({
            idSolicitud,
            correoSupervisor,
            tareas,
            fechaInicio: fechaInicioFormatted,
            fechaTermino: fechaTerminoFormatted,
        });

        // Actualizar solicitud asociada
        await db.solicitud.update(
            { 
            supervisorCheck: true,
            fase: 4 
            },
            { where: { idSolicitud } }
        );
        const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });
        const alumno = await db.usuario.findOne({ where: { rut:solicitud.rut} });
        const supervisor = await db.supervisor.findOne({where:{correoSupervisor:correoSupervisor}});
        const empresa= await db.empresa.findOne({where:{rutEmpresa:solicitud.rutEmpresa}});
        console.log(alumno.correo)
        const mailOptions = {
            from: MAIL_USER,
            to: alumno.correo,
            subject: `Tu practica en ${empresa.razonSocial} esta en coordinacion`,
            text: `Tu supervisor de practica ${supervisor.nombre} de la empresa ${empresa.razonSocial} completo la coordinacion de tu practica, puedes ver la en el sistema.`
        };
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: MAIL_USER,
                pass: PASS_USER,
            },
        });
        
        transporter.sendMail(mailOptions);
        return res.status(200).json({
            message: "Carta creada exitosamente.",
            carta
        });

    } catch (err) {
        console.error('Error al crear carta:', err);
        return res.status(500).json({
            message: "Error al crear carta.",
            err
        });
    }
};
const obtenerCarta = async (req, res) => {
    const { idSolicitud } = req.body;
    try {
        const carta = await db.carta.findOne({ where: { idSolicitud } });
        if (!carta) {
            return res.status(404).json({
                message: "Carta no encontrada."
            });
        }
        return res.status(200).json(carta);
    } catch (err) {
        console.error('Error al obtener carta:', err);
        return res.status(500).json({
            message: "Error al obtener carta.",
            err
        });
    }
};

module.exports = {
    crearCarta,
    obtenerCarta
}