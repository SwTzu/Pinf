const db = require("../models");
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const { conversion } = require('./conversion.controller.js');


exports.unirDatos = async (req,res) => {
    const { token, rutEmpresa, asignatura} = req.body;
    const rutUsuario = jwt.verify(token, key).rut;
    const usuario = await db.usuario.findOne({where:{rut:rutUsuario}});
    const empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});
    
    let numeroP;
    switch (asignatura) {
        case "1":
            numeroP= "primera";
            break;
        case "2":
            numeroP= "segunda";
            break;
        default:
            numeroP= "desconocida";
            break;
    }
    const datosFormatoJSON = {
          count: 3,
          razonSocial: empresa.razonSocial,
          direccion: empresa.direccion,
          region : empresa.region,
          rut: usuario.rut,
          semestre: 2,
          horas: 320,
          numeroPractica: numeroP,
          nombre1: usuario.nombre1,
          nombre2: usuario.nombre2,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2,
      };
      await conversion({ body: datosFormatoJSON }, res);
};
