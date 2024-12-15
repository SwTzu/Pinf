const db = require("../models");
const Op = db.Sequelize.Op;

const listarAreas = async (req, res) => {
    try {
        const areas = await db.area.findAll();
        return res.status(200).json(areas);
    }
    catch (err) {
        return res.status(500).json({
            message: "Error al listar las áreas.",
            err,
        });
    }
};

const crearArea = async (req, res) => {
    const { nombre} = req.body;
    try {
        const area = await db.area.create({
            nombre: nombre,
        });
        return res.status(200).json(area);
    }
    catch (err) {
        return res.status(500).json({
            message: "Error al crear el área.",
            err,
        });
    }
};

const buscarArea = async (req, res) => {
    const { id } = req.body;
    try {
        const area = await db.area.findOne({ where: { id: id } });
        if (!area) {
            return res.status(404).json({ message: "El área no existe." });
        }
        return res.status(200).json(area);
    }
    catch (err) {
        return res.status(500).json({
            message: "Error al buscar el área.",
            err,
        });
    }
}

module.exports = {
    listarAreas,
    crearArea,
    buscarArea
}