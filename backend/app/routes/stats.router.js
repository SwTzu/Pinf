const router = require('express').Router();
const tokenfunc = require('../helpers/token.helpers.js');
const { empresasAprobadas, getNumerosEmpresas } = require('../controllers/stats.controller.js');
router.get("/", (req, res) => {
    res.json({message: "Ruta de /stats/ funcionando"});
});

router.get("/empresasAprobadas", empresasAprobadas);
router.post("/getNumerosEmpresas", getNumerosEmpresas);
module.exports = router;