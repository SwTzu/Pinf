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

const supervisorRouter = require('./supervisor.router.js');
const memoriaRouter = require('./memoria.router.js');
const informeRouter = require('./informe.router.js');

const statsRouter = require('./stats.router.js');


module.exports = app => {

    app.use('/utils', utilsRouter);
    app.use('/usuario', usuarioRouter);
    app.use('/empresa', empresaRouter);
    app.use('/solicitud',solicitudRouter);
    app.use('/supervisor',supervisorRouter);
    app.use('/memoria',memoriaRouter);
    app.use('/informe',informeRouter);
    app.use('/stats', statsRouter);
}
