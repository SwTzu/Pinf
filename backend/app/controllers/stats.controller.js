const db = require('../models');
const Op = db.Sequelize.Op;
const tokenfunc = require('../helpers/token.helpers.js');

const empresasAprobadas = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({
      include: [
        {
          model: db.empresa,
          as: 'empresa',
        },
      ],
      where: {
        calificacion: {
          [db.Sequelize.Op.gte]: 4,
        },
      },
    });

    const empresasRepetidas = {};
    solicitudes.forEach(async (solicitud) => {
      console.log(solicitud.empresa.razonSocial);
      if (empresasRepetidas[solicitud.empresa.razonSocial]) {
        empresasRepetidas[solicitud.empresa.razonSocial]++;
      } else {
        empresasRepetidas[solicitud.empresa.razonSocial] = 1;
      }
    });

    res.status(200).json(empresasRepetidas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNumerosEmpresas = async (req, res) => {
  try{
    const { token } = req.body;
    const response = await tokenfunc.validarToken(token, 2);

    if (response.Boolean) {
      const totalCount = await db.empresa.count(); // Usamos count() para solo obtener el número de filas
      const verificadasCount = await db.empresa.count({ where: { verificado: true } });

      return res.status(200).json({
          message: "Número de empresas encontradas.",
          verificadas: verificadasCount,
          total: totalCount
      });

    } else {
      return res.status(401).json({
        message: "Usuario no autorizado."
      });
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
    
};

module.exports = {
  empresasAprobadas,
  getNumerosEmpresas
};
