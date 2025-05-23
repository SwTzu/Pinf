const router = require('express').Router();
const axios = require('axios');
const { response } = require('express');

const { DB_HOST,RUN_PORT } = require('../config/const.js');

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
  modificarNotasCoo,
  todasPracticas,
  check
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
router.post('/allSolicitudesCoo', allSolicitudesCoo);//{token}
router.get('/allSolicitudesJefe', allSolicitudesJefe);
router.get('/allSolicitudesSec', allSolicitudesSec);
router.post('/readyAlumno', readyAlumno); // {idSolicitud}
router.post('/readySupervisor', readySupervisor);
router.post('/actualizar', actualizarFase); // {idSolicitud, nroFase}
router.post('/supXest', supXest); // {rutSupervisor, rutEstudiante}
router.post('/eliminar', eliminarSolicitud); // {idSolicitud}
router.get('/fechaauto', fechaauto);
router.post('/addSup', agregarSup); // { token, idSolicitud, correoSupervisor }
router.post('/searchFase',buscarFase); // {fase}
router.post('/todasPracticas', todasPracticas);
router.post('/check', check); // {token}


// Rutas de Notas de Coordinador
router.post('/notasCoo', mostrarNotasCoo); // {*token,idSolicitud}
router.post('/ModNotas', modificarNotasCoo); // {*token,idSolicitud,notas}

const intervalo = 12*60*60*1000;

router.post('/SolicitudyEmpresa', async (req, res) => {
  try {
    const { empresa } = req.body;
    const { rutEmpresa, razonSocial, ciudad, region, direccion, rubro } = empresa;
    
    let response = await axios.post(`http://${DB_HOST}:${RUN_PORT}/empresa/crear`, {  
      rutEmpresa, 
      razonSocial, 
      ciudad, 
      region, 
      direccion, 
      rubro
    });
    
    const { estudiante } = req.body;
    const { token, numeroPractica } = estudiante;
    
    let response2 = await axios.post(`http://${DB_HOST}:${RUN_PORT}/solicitud/crear`, {
      token, 
      datos: { rutEmpresa, numeroPractica }
    });
    
    res.status(200).json(response2.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor", 
      error: error
    });
  }
});

module.exports = router;
