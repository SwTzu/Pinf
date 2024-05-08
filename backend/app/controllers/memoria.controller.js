const db = require("../models");

const Op = db.Sequelize.Op;

const uploadPdf = async (req, res) => {
    try {
        if (req.file == undefined) {
        return res.status(400).send("Por favor suba un archivo!");
        }
    
        await db.memoria.create({
        idSolicitud: req.body.idSolicitud,
        documento: req.file.originalname,
        fechaEnvio: new Date(),
        });
    
        res.status(200).send({
        message: "Archivo subido exitosamente: " + req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
        message: `No se pudo subir el archivo: ${req.file.originalname}. ${err}`,
        });
    }
    }
    module.exports = {
    uploadPdf,
    };