const db = require("../models");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Op = db.Sequelize.Op;

const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para cada archivo
    },
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      console.log('Archivo recibido:', file);
      const {idAceptacion} = req.body;
      const carta= db.carta.findOne({where:{idAceptacion}});
      const solicitud= db.solicitud.findOne({where:{idSolicitud:carta.idSolicitud}});
      const pdfTypes = /pdf/; // PDF
  
      // Validar la extensión del archivo
      const extName = path.extname(`${solicitud.rut}_${solicitud.numeroPractica}_${solicitud.rutEmpresa}_${solicitud.fechaSolicitud.toDateString()}.pdf`).toLowerCase();
      const isPDF = pdfTypes.test(extName);
  
      if (isPDF ) {
        cb(null, true); // Archivo permitido
      } else {
        cb(new Error('Formato de archivo no permitido. Solo se permiten Excel, imágenes, PDF y documentos de texto.'));
      }
    },
});



const uploadPdf = async (req, res) => {
    try {
        const { idAceptacion } = req.body;
        const carta= db.carta.findOne({where:{idAceptacion}});
        const solicitud= db.solicitud.findOne({where:{idSolicitud:carta.idSolicitud}});

        const memoria = db.memoria.create({
            idSolicitud: solicitud.idSolicitud,
            documento: `${solicitud.rut}_${solicitud.numeroPractica}_${solicitud.rutEmpresa}_${solicitud.fechaSolicitud.toDateString()}.pdf`,
            fechaEnvio: new Date(),
        });

        return res.status(200).json({
            message: "Memoria creada exitosamente.",
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
        const { idMemoria } = req.body;
        const memoria = db.memoria.findOne({ where: { idMemoria } });
        const filePath = path.join(uploadPath, memoria.documento);
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