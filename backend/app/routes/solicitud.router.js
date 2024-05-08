const router = require('express').Router();
const axios = require('axios');

const { DB_HOST } = require('../config/const.js');

const {
  faseSolicitud,
  verSolicitudesUsuario,
  verSolicitudesAceptadasU,
  crearSolicitud,
  allSolicitudesCoo,
  allSolicitudesJefe,
  allSolicitudesSec,
  readyAlumno,
  readySupervisor,
  actualizarFase,
  supXest,
  fechaauto,
  eliminarSolicitud,
  agregarSup,
  buscarFase,
  mostrarNotasCoo,
  modificarNotasCoo
} = require('../controllers/solicitud.controller.js');

//Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Ruta de /solicitud/ funcionando' });
});

// Ruta de validacion de usuario                                // DATOS JSON:
router.post('/crear', crearSolicitud); // { rut, rutempresa, extension, numeroPractica ,}
router.put('/:id', faseSolicitud); // {fase, descripcionRechazo (puede ser nulo)}
router.post('/listaSolicitudes', verSolicitudesUsuario); // {rut}
router.post('/SolicitudesAceptadas', verSolicitudesAceptadasU); // {rut}
router.get('/allSolicitudesCoo', allSolicitudesCoo);
router.get('/allSolicitudesJefe', allSolicitudesJefe);
router.get('/allSolicitudesSec', allSolicitudesSec);
router.post('/readyAlumno', readyAlumno); // {idSolicitud}
router.post('/readySupervisor', readySupervisor);
router.put('/actualizar/:id', actualizarFase); // {idSolicitud, nroFase}
router.post('/supXest', supXest); // {rutSupervisor, rutEstudiante}
router.post('/eliminar', eliminarSolicitud); // {idSolicitud}
router.get('/fechaauto', fechaauto);
router.post('/addSup', agregarSup); // { token, idSolicitud, correoSupervisor }
router.post('/searchFase',buscarFase); // {fase}

// Rutas de Notas de Coordinador
router.get('/notasCoo', mostrarNotasCoo);
router.post('/modificarNotasCoo', modificarNotasCoo); // {idSolicitud, notaCoo}

// Revisar
async function hacerSolicitud() {
  try {
    console.log('Haciendo solicitud');
    const respuesta = await axios.get(
      `${DB_HOST}/solicitud/fechaauto`
    );
    console.log('Respuesta:', respuesta.data);
  } catch (error) {
    console.error('Error al hacer la solicitud:', error.message);
  }
}

async function hacerSolicitud() {
  try {
    const respuesta = await axios.get(`${DB_HOST}/solicitud/fechaauto`);
    console.log('\n\n\nRespuesta:', respuesta.data,"\n\n\n");
  } catch (error) {
    console.error('\n\n\ Segundo error al hacer solicitud:', error.message,"\n\n\n");
  }
}
const intervalo = 24*60*60*1000;
function solicitarAutomaticamente() {
  hacerSolicitud();
  setTimeout(solicitarAutomaticamente, intervalo);
}
solicitarAutomaticamente();
module.exports = router;
