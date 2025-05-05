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
    try {
        const { token } = req.body;
        const response = await tokenfunc.validarToken(token, 2);

        if (response.Boolean) {
            const totalCount = await db.empresa.count(); // Usamos count() para solo obtener el número de filas
            const verificadasCount = await db.empresa.count({
                where: { verificado: true },
            });

            return res.status(200).json({
                message: 'Número de empresas encontradas.',
                verificadas: verificadasCount,
                total: totalCount,
            });
        } else {
            return res.status(401).json({
                message: 'Usuario no autorizado.',
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const areasPracticas = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const cartas = await db.carta.findAll({
            where: db.Sequelize.where(
                db.Sequelize.fn('YEAR', db.Sequelize.col('createdAt')),
                currentYear
            ),
        });
        const areas = {};
        cartas.forEach((carta) => {
            if (!carta.tareas) return;
            const tareas =
                typeof carta.tareas === 'string'
                    ? JSON.parse(carta.tareas)
                    : carta.tareas;
            tareas.forEach((tarea) => {
                tarea.areas.forEach((area) => {
                    if (areas[area.nombre]) {
                        areas[area.nombre]++;
                    } else {
                        areas[area.nombre] = 1;
                    }
                });
            });
        });
        const areasArray = Object.keys(areas).map((key) => ({
            name: key,
            value: areas[key],
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
            where: db.Sequelize.where(
                db.Sequelize.fn('YEAR', db.Sequelize.col('createdAt')),
                currentYear
            ),
        });
        const fases = {};

        solicitudes.forEach((solicitud) => {
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

const EMPverificadas = async (req, res) => {
    try {
        const empresas = await db.empresa.findAll({
            where: { verificado: true },
            attributes: [
                'region',
                [db.Sequelize.fn('COUNT', db.Sequelize.col('region')), 'count'],
            ],
            group: ['region'],
        });

        const empresasPorRegion = {};
        empresas.forEach((empresa) => {
            empresasPorRegion[empresa.region] = empresa.dataValues.count;
        });
        const totalVerificadas = await db.empresa.count({
            where: { verificado: true },
        });
        empresasPorRegion.totalVerificadas = totalVerificadas;
        return res.status(200).json(empresasPorRegion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const practicasAnuales = async (req, res) => {
    try {
        const practicas = await db.solicitud.findAll({
            attributes: [
                [db.Sequelize.fn('YEAR', db.Sequelize.col('fechaSolicitud')), 'año'],
                [db.Sequelize.literal(`SUM(CASE WHEN fase = 9 THEN 1 ELSE 0 END)`), 'cantidad_terminadas'],
                [db.Sequelize.literal(`SUM(CASE WHEN fase >= 1 and fase < 9 THEN 1 ELSE 0 END)`), 'cantidad_solicitadas']
            ],
            group: [db.Sequelize.fn('YEAR', db.Sequelize.col('fechaSolicitud'))],
        });
        return res.status(200).json(practicas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const cantidadCoherte = async (req, res) => {
    try {
        const evaluados = await db.informe.findAll({
            where: {
                nota: {
                    [Op.ne]: null,
                },
            },
        });

        const ranges = {};
        evaluados.forEach((evaluado) => {
            const nota = evaluado.nota;
            const lower = Math.floor(nota);
            const upper = lower + 1;
            const key = upper;
            if (ranges[key]) {
                ranges[key]++;
            } else {
                ranges[key] = 1;
            }
        });

        for (let i = 0; i < 7; i++) {
            const key = i+1;
            if (ranges[key] === undefined) {
                ranges[key] = 0;
            }
        }

        const sortedRanges = Object.entries(ranges)
            .sort((a, b) => {
                const aLower = parseInt(a[0].split(' ')[0], 10);
                const bLower = parseInt(b[0].split(' ')[0], 10);
                return aLower - bLower;
            })
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        return res.status(200).json(sortedRanges);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const statRegiones = async (_req, res) => {
    try {
        // Lista de regiones oficiales de Chile
        const chileRegions = {
            "Arica y Parinacota": 'Arica y Parinacota',
            "Tarapacá": 'Tarapacá',
            "Antofagasta": 'Antofagasta',
            "Atacama": 'Atacama',
            "Coquimbo": 'Coquimbo',
            "Valparaíso": 'Valparaíso',
            "Metropolitana de Santiago": 'Metropolitana',
            "Libertador General Bernardo O'Higgins": "O'Higgins",
            "Maule": 'Maule',
            "Ñuble": 'Ñuble',
            "Biobío": 'Biobío',
            "La Araucanía": 'La Araucanía',
            "Los Ríos": 'Los Ríos',
            "Los Lagos": 'Los Lagos',
            "Aysén del General Carlos Ibáñez del Campo": 'Aysén',
            "Magallanes y de la Antártica Chilena": 'Magallanes'
        };

        // Obtenemos los valores en minúsculas del diccionario para filtrado
        const validRegions = Object.values(chileRegions).map(region => region.toLowerCase());

        const empresas = await db.empresa.findAll({
            include: [{
                model: db.solicitud,
                as: 'solicitud de practicas',
                required: true,
                where: {
                    fase: {
                        [Op.between]: [1, 8]
                    },
                    fechaSolicitud: {
                        [Op.gte]: db.Sequelize.fn('DATE_SUB', db.Sequelize.fn('NOW'), db.Sequelize.literal('INTERVAL 1 YEAR'))
                    }
                },
                attributes: []
            }],
            attributes: [
                [db.Sequelize.fn('lower', db.Sequelize.col('region')), 'regionLower'],
                [db.Sequelize.fn('COUNT', db.Sequelize.col('region')), 'count']
            ],
            where: db.Sequelize.where(
                db.Sequelize.fn('lower', db.Sequelize.col('region')),
                { [Op.in]: validRegions }
            ),
            group: [db.Sequelize.fn('lower', db.Sequelize.col('region'))],
            raw: true
        });

        // Mapeamos el valor obtenido al key correspondiente en chileRegions
        const regiones = {};
        empresas.forEach((empresa) => {
            const foundKey = Object.keys(chileRegions).find(key => chileRegions[key].toLowerCase() === empresa.regionLower);
            if (foundKey) {
                regiones[foundKey] = empresa.count;
            }
        });

        // Agregar las regiones que no se encontraron con valor 0
        Object.keys(chileRegions).forEach((key) => {
            if (!regiones.hasOwnProperty(key)) {
                regiones[key] = 0;
            }
        });

        return res.status(200).json(regiones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    statRegiones,
    cantidadCoherte,
    practicasAnuales,
    empresasAprobadas,
    getNumerosEmpresas,
    areasPracticas,
    estadisticasFasesSolicitudes,
    EMPverificadas,
};
