const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const { conversion } = require('./conversion.controller.js');


exports.unirDatos = async (req,res) => {
    const { token, rutEmpresa, numeroPractica} = req.body;
    const decoded = jwt.verify(token, key);
    try { 
        // Remove the declaration of rutUsuario and directly use the value in the query
        const usuario = await db.usuario.findOne({where:{rut: decoded.rut}});
    
        const empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});
        const solicitud = await db.solicitud.findOne({
            where: {
            rutEmpresa: rutEmpresa,
            rut: decoded.rut,
            fase: {
                [db.Sequelize.Op.ne]: 0
            }
            }
        });
        let numeroP;
        let horass;
        switch (numeroPractica) {
            case 1:
                numeroP= "primera";
                horass=270;
                break;
            case 2:
                numeroP= "segunda";
                horass=324;
                break;
            default:
                numeroP= "desconocida";
                horass=0;
                break;
        }
        const currentYear = new Date().getFullYear();
        const solicitudes = await db.solicitud.findAll({
            where: db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('createdAt')), currentYear)
        });
        const cont = solicitudes.length;
        const mesSolicitud = new Date(solicitud.fechaSolicitud).getMonth() + 1;
        const semestre = mesSolicitud >= 1 && mesSolicitud <= 6 ? 1 : 2;
        const datosFormatoJSON = {
              count: cont,
              razonSocial: empresa.razonSocial,
              direccion: empresa.direccion,
              region : empresa.region,
              rut: usuario.rut,
              semestre: semestre,
              horas: horass,
              numeroPractica: numeroP,
              nombre1: usuario.nombre1,
              nombre2: usuario.nombre2,
              apellido1: usuario.apellido1,
              apellido2: usuario.apellido2,
          };
          await conversion({ body: datosFormatoJSON }, res);
    } catch (error) {
        return res.status(401).send({"error": error});
    }
};
