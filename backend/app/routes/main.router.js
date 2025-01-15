// Creacion objeto router.
const router = require('express').Router();

// Importacion de Routers
/*
i.e :
    const estudiantesRouter = require('./estudiantes.router.js');     
    app.use('/api/estudiantes', estudiantesRouter);
*/
const utilsRouter = require('./utils.router.js');
const usuarioRouter = require('./usuario.router.js');
const empresaRouter = require('./empresa.router.js');
const solicitudRouter = require('./solicitud.router.js');
const areaRouter = require('./area.router.js');
const supervisorRouter = require('./supervisor.router.js');
const memoriaRouter = require('./memoria.router.js');
const informeRouter = require('./informe.router.js');
const cartaRouter = require('./carta.router.js');
const statsRouter = require('./stats.router.js');
const coordinadorRouter = require('./coordinador.router.js');


module.exports = app => {

    app.use('/api/utils', utilsRouter);
    app.use('/api/usuario', usuarioRouter);
    app.use('/api/empresa', empresaRouter);
    app.use('/api/solicitud',solicitudRouter);
    app.use('/api/supervisor',supervisorRouter);
    app.use('/api/memoria',memoriaRouter);
    app.use('/api/informe',informeRouter);
    app.use('/api/stats', statsRouter);
    app.use('/api/area', areaRouter);
    app.use('/api/carta', cartaRouter);
    app.use('/api/coordinador', coordinadorRouter);
}
