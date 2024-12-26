const db = require("../models");
const Op = db.Sequelize.Op;



const calcularPromedio = (aspectos) => {
    let total = 0;
    let count = 0;
    for (const key in aspectos) {
        if (aspectos[key]) {
            total += parseInt(aspectos[key], 10);
            count++;
        }
    }
    return total / count;
};



const crearInforme = async (req, res) => {
    const { idSolicitud, formulario} = req.body;

    try {
        const aspectos_generales = calcularPromedio(formulario.aspectos_generales)*0.5;
        const aspectos_tecnicos = calcularPromedio(formulario.aspectos_tecnicos)*0.4;
        const aspectos_comunicacionales = calcularPromedio(formulario.aspectos_comunicacionales)*0.1;

        const informe = await db.informe.create({
            idSolicitud,
            formulario,
            fechaEnvio: new Date(),
            nota: aspectos_generales+aspectos_tecnicos+aspectos_comunicacionales
        });
        const idInforme = informe.idInforme;
        const carta = await db.carta.findOne({where:{idSolicitud}});
        await carta.update({
            idInforme:idInforme
        });
        const solicitud = await db.solicitud.findOne({where:{idSolicitud:idSolicitud}});
        if(solicitud.memoria){
            await solicitud.update({
                fase:8,
                informe:true
            });
        }
        else{
            await solicitud.update({
                informe:true
            });
        }
        return res.status(200).json({
            message: "Memoria creada exitosamente."
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al crear memoria.",
            err
        });
    }
};

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