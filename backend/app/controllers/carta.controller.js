const db = require("../models");
const Op = db.Sequelize.Op;

const crearCarta = async (req, res) => {
    
    const { idSolicitud, correoSupervisor, tareas, area, fechaInicio, fechaTermino } = req.body;
  
    try {
        // Buscar si el área ya existe en la tabla `Area`
        let areaRecord = await db.Area.findOne({ where: { nombre: area } });
  
        if (!areaRecord) {
            // Si el área no existe, crear una nueva entrada en la tabla `Area`
            areaRecord = await db.Area.create({ nombre: area });
        }
  
        // Crear la carta con el área proporcionada (ya sea nueva o existente)
        const carta = await db.carta.create({
            idSolicitud,
            correoSupervisor,
            tareas,
            area: areaRecord.nombre,  // Almacenar el texto del área directamente en la carta
            fechaInicio,
            fechaTermino
        });
  
        return res.status(200).json({
            message: "Carta creada exitosamente.",
            carta
        });

    } 
    catch (err) {
        return res.status(500).json({
            message: "Error al crear carta.",
            err
        });
    }
};


module.exports = {
    crearCarta
}