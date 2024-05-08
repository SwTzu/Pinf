const router = require('express').Router();
const { empresasAprobadas } = require('../controllers/stats.controller.js');
router.get("/", (req, res) => {
    res.json({message: "Ruta de /stats/ funcionando"});
});

router.get("/empresasAprobadas", empresasAprobadas);
module.exports = router;