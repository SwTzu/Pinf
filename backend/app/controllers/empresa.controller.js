const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const tokenfunc = require('../helpers/token.helpers.js');
const key = require('../config/const.js').JWT_SECRET;

const validarEmpresa = async (req,res,next) => {

    const { razonSocial } = req.body;

    const empresa = await db.empresa.findOne({where:{razonSocial:razonSocial}});

    try{

        if(empresa){
            return res.status(200).json({
                message:"La empresa ya existe.",
                empresa,
            });
        }
        else{
            return res.status(404).json({
                message:"La empresa no existe.",
            });
        }
    } catch(err){
        return res.status(500).json({
            message:"Error al buscar empresa.",
            err
        });
    }
    
}

const crearEmpresa = async (req,res) => {

    const { rutEmpresa, razonSocial, ciudad, region, direccion, rubro } = req.body;

    try{

        empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});

        if (empresa){
            return res.status(409).json({                           // 409: Revisar codigo HTTP. Sharp 🤨 
                message:"La empresa ya existe."
            });
        }
        else{

            const empresa = await db.empresa.create({
                rutEmpresa,
                razonSocial,
                ciudad,
                region,
                direccion,
                rubro
            });

            return res.status(200).json({
                message:"Empresa creada exitosamente.",
                empresa
            });
        }
    } catch(err){
        return res.status(500).json({
            message:"Error al crear empresa.",
            err
        });
    }
}

// Lista de Razones Sociales de las empresas
const listarEmpresas = async (req,res) => {

    // Deberian mostrarse empresas ya validadas.
    // A definir.

    try{

        const empresas = await db.empresa.findAll({
            where: { verificado: true }
        });

        return res.status(200).json({
            message:"Empresas listadas exitosamente.",
            empresas
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al listar empresas.",
            err
        });
    }
};

// Busqueda de empresas por nombre o parte de este
const buscarEmpresas = async (req,res) => {

    const razonSocial = req.query.razonSocial;

    try{

        const empresas = await db.empresa.findAll({
            where: { razonSocial: {
                [Op.like]: `%${razonSocial}%`
            } }
        });

        if(empresas.length == 0){
            return res.status(404).json({
                message:"No se encontraron empresas."
            });
        }

        return res.status(200).json({
            message:"Empresas encontradas.",
            empresas
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al buscar empresas.",
            err
        });
    }
};

// Consulta de empresa de una solicitud especifica
const getEmpresa = async (req,res) => {

    const { idSolicitud } = req.body;


    try{

        const solicitud = await db.solicitud.findOne({where:{idSolicitud:idSolicitud}});

        const rutEmpresa = solicitud.rutEmpresa; 

        const empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});

        if(!empresa){
            return res.status(404).json({
                message:"La empresa no existe."
            });
        }

        return res.status(200).json({
            message:"Empresa encontrada.",
            empresa
        });
    } catch(err){
        return res.status(500).json({
            message:"Error al buscar empresa.",
            err
        });
    }
};

const verificarEmpresa = async (req,res) => {

    const { rutEmpresa } = req.body;

    try{
        const empresa = await db.empresa.findOne({where:{rutEmpresa:rutEmpresa}});
        if(!empresa){
            return res.status(404).json({
                message:"La empresa no existe."
            });
        };

        empresa.verificado = true;
        await empresa.save();

        return res.status(200).json({
            message:"Empresa verificada exitosamente.",
            empresa
        });
    }
    catch(err){

    }
};

const getEmpresas = async (req,res) => {
    const {token} = req.body;
    const response = await tokenfunc.validarToken(token, 4);
    console.log(response);
    if(response.Boolean){
        const empresas = await db.empresa.findAll();
        return res.status(200).json({
            message:"Empresas encontradas.",
            empresas
        });
    }else{
        return res.status(401).json({
            message: "Usuario no autorizado."
        });
    }
};

module.exports = {
    validarEmpresa,
    crearEmpresa,
    listarEmpresas,
    buscarEmpresas,
    getEmpresa,
    verificarEmpresa,
    getEmpresas
};
