const db = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Op = db.Sequelize.Op;
const tokenfunc = require('../helpers/token.helpers.js');

const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage, // Almacena archivos en memoria
    fileFilter: (req, file, cb) => {
      const formatosPermitidos = /pdf/; // Tipos permitidos
      const extName = path.extname(file.originalname).toLowerCase();
      if (formatosPermitidos.test(extName)) {
        cb(null, true); // Archivo permitido
      } else {
        cb(new Error('Formato de archivo no permitido.'));
      }
    },
});

const uploadPdf = async (req, res) => {
    try {
        const {token}=req.body
        if(!token){
            return res.status(400).json({
                message: "Token no recibido."
            });
        }
        const decoded = tokenfunc.decode(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Token inválido."
            });
        }
        const { idSolicitud } = req.body;
        const carta = await db.carta.findOne({ where: { idSolicitud } });
        const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

        if (!carta || !solicitud) {
            return res.status(404).json({
                message: "No se encontró la solicitud o la carta."
            });
        }
        const archivo = req.file;
        const formatosPermitido='application/pdf'

        if(archivo.mimetype!==formatosPermitido){
            return res.status(400).json({
                message: "Formato de archivo no permitido."
            });
        }
        const uploadPath = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        let finalPath ;
        const fileName = `memoria_${idSolicitud}.pdf`;
        finalPath = path.join(uploadPath, fileName);
        fs.writeFileSync(finalPath, archivo.buffer);

        const memoria= await db.memoria.create({
            idSolicitud: solicitud.idSolicitud,
            documento:finalPath,
            fechaEnvio: new Date()
        });

        carta.memoria = memoria.idMemoria;
        solicitud.memoria = true;
        if(solicitud.informe){
            solicitud.fase = 8;
        }
        await carta.save();
        await solicitud.save();
        return res.status(200).json({
            message: "Memoria creada correctamente.",
            memoria
        });

    } catch (err) {
        console.error('Error al crear memoria:', err);
        return res.status(500).json({
            message: "Error al crear memoria.",
            err
        });
    }
}

const descargarPDF = async (req, res) => {
    try {
        const { idSolicitud } = req.body;
        const memoria = await db.memoria.findOne({ where: { idSolicitud } });
        if (!memoria) {
            return res.status(404).json({
                message: "Memoria no encontrada."
            });
        }
        const uploadPath = path.join(__dirname, '../../uploads');
        const filePath = path.join(uploadPath, path.basename(memoria.documento));
        return res.download(filePath);
    } catch (err) {
        console.error('Error al descargar PDF:', err);
        return res.status(500).json({
            message: "Error al descargar PDF.",
            err
        });
    }
}
module.exports = {
    uploadPdf,
    upload,
    descargarPDF
};