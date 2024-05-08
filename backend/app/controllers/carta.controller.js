const db = require("../models");
const Op = db.Sequelize.Op;

const crearCarta = async (req,res) => {
    
        const {idSolicitud,correoSupervisor, tareas, area, fechaInicio,fechaTermino} = req.body;
    
        try{
            
            const carta = await db.carta.create({
                idSolicitud,
                correoSupervisor,
                tareas,
                area,
                fechaInicio,
                fechaTermino
            });
    
            return res.status(200).json({
                message:"Memoria creada exitosamente.",
                carta
            });
        } catch(err){
            return res.status(500).json({
                message:"Error al crear memoria.",
                err
            });
        }
}
module.exports = {
    crearCarta
}