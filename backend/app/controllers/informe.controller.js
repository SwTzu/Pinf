const db = require("../models");
const Op = db.Sequelize.Op;

const crearInforme = async (req,res) => {
    
        const {idSolicitud, formulario, fechaEnvio , nota} = req.body;
    
        try{
            
            const informe = await db.informe.create({
                idSolicitud,
                formulario,
                fechaEnvio,
                nota
            });
    
            return res.status(200).json({
                message:"Memoria creada exitosamente.",
                informe
            });
        } catch(err){
            return res.status(500).json({
                message:"Error al crear memoria.",
                err
            });
        }
}

const obtenerInforme = async (req,res) => {
    const {idSolicitud} = req.body;
    try{
        const informe = await db.informe.findOne({
            where:{
                idSolicitud
            }
        });
        return res.status(200).json({
            message:"Informe obtenido exitosamente.",
            informe
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al obtener informe.",
            err
        });
    }
}

const obtenerTodos = async (req,res) => {
    try{
        const informes = await db.informe.findAll();
        return res.status(200).json({
            message:"Informes obtenidos exitosamente.",
            informes
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al obtener informes.",
            err
        });
    }
}
module.exports = {
    crearInforme,
    obtenerInforme,
    obtenerTodos
}