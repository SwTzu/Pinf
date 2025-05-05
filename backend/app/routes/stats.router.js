const router = require('express').Router();
const tokenfunc = require('../helpers/token.helpers.js');
const { empresasAprobadas, getNumerosEmpresas ,areasPracticas,estadisticasFasesSolicitudes,EMPverificadas,practicasAnuales,cantidadCoherte,statRegiones} = require('../controllers/stats.controller.js');
router.get("/", (req, res) => {
    res.json({message: "Ruta de /stats/ funcionando"});
});

router.get("/statRegiones", statRegiones)
router.get("/cantidadCoherte", cantidadCoherte);
router.get("/practicasAnuales", practicasAnuales);
router.get("/empresasAprobadas", empresasAprobadas);
router.post("/getNumerosEmpresas", getNumerosEmpresas);
router.get("/areasPracticas",areasPracticas);
router.get("/estadisticasFasesSolicitudes",estadisticasFasesSolicitudes)
router.get("/EMPverificadas",EMPverificadas)
module.exports = router;