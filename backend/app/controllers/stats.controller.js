const db = require('../models');
const Op = db.Sequelize.Op;

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

module.exports = {
  empresasAprobadas,
};
