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

const areasPracticas = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const cartas = await db.carta.findAll({
      where: db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('createdAt')), currentYear)
    });
    const areas = {};
    cartas.forEach(carta => {
      const tareas = typeof carta.tareas === 'string' ? JSON.parse(carta.tareas) : carta.tareas;
      tareas.forEach(tarea => {
        tarea.areas.forEach(area => {
          if (areas[area.nombre]) {
            areas[area.nombre]++;
          } else {
            areas[area.nombre] = 1;
          }
        });
      });
    });
    const areasArray = Object.keys(areas).map(key => ({
      name: key,
      value: areas[key]
    }));
    res.status(200).json(areasArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const estadisticasFasesSolicitudes = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const solicitudes = await db.solicitud.findAll({
            where: db.Sequelize.where(db.Sequelize.fn('YEAR', db.Sequelize.col('createdAt')), currentYear)
        });
        const fases = {};

        solicitudes.forEach(solicitud => {
            if (fases[solicitud.fase]) {
                fases[solicitud.fase]++;
            } else {
                fases[solicitud.fase] = 1;
            }
        });
        fases.total = solicitudes.length;
        res.status(200).json(fases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const EMPverificadas= async (req, res) => {
    try {
        const empresas = await db.empresa.findAll({
            where: { verificado: true },
            attributes: ['region', [db.Sequelize.fn('COUNT', db.Sequelize.col('region')), 'count']],
            group: ['region']
        });

        const empresasPorRegion = {};
        empresas.forEach(empresa => {
            empresasPorRegion[empresa.region] = empresa.dataValues.count;
        });
        const totalVerificadas = await db.empresa.count({ where: { verificado: true } });
        empresasPorRegion.totalVerificadas = totalVerificadas;
        return res.status(200).json(empresasPorRegion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    empresasAprobadas,
    getNumerosEmpresas,
    areasPracticas,
    estadisticasFasesSolicitudes,
    EMPverificadas
};
