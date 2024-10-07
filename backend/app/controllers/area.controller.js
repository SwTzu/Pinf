const db = require("../models");
const Op = db.Sequelize.Op;

const listarAreas = async (req, res) => {
    try {
        const areas = await db.Area.findAll();
        return res.status(200).json(areas);
    }
    catch (err) {
        return res.status(500).json({
            message: "Error al listar las áreas.",
            err,
        });
    }
};

module.exports = {
    listarAreas
}