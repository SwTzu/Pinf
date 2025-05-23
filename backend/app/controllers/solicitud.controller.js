const db = require('../models');
const key = require('../config/const.js').JWT_SECRET;
const { MAIL_USER, PASS_USER, MAIL_PORT} = require('../config/const.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Op = db.Sequelize.Op;
const TOKEN = require('../helpers/token.helpers.js');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: PASS_USER,
  },
});
exports.transporter = transporter;

const buscarFase = async (req, res) => {
  const { fase } = req.body;
  try {
    const solicitudes = await db.solicitud.findAll({
      where: { fase: fase },
    });
    return res.status(200).json({
      message: 'Solicitudes encontradas exitosamente',
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

const todasPracticas = async (req, res) => {
  try {
    const token = req.body.token;
    const coordinador = await jwt.verify(token, key);
    if (coordinador.tipoUsuario !== 2) {
      return res.status(401).json({
        message: 'No tienes permisos para ver las practicas',
      });
    }
    const solicitudes = await db.solicitud.findAll({ where: { fase: { [Op.gt]: 4, [Op.lt]: 9 } } });
    const solicitudesWithDetails = await Promise.all(
      solicitudes.map(async (solicitud) => {
        const usuario = await db.usuario.findOne({ where: { rut: solicitud.rut } });
        const carta = await db.carta.findOne({ where: { idSolicitud: solicitud.idSolicitud } });
        console.log(solicitud.idSolicitud,carta!=null)

        const empresa = await db.empresa.findOne({ where: { rutEmpresa: solicitud.rutEmpresa } });

        return {
          id: solicitud.idSolicitud,
          nombreEstudiante: `${usuario.nombre1} ${usuario.apellido1} ${usuario.apellido2}`,
          rutEstudiante: solicitud.rut,
          empresa: solicitud.rutEmpresa,
          razonSocial: empresa.razonSocial,
          fase: solicitud.fase,
          fechaSolicitud: solicitud.fechaSolicitud,
          notasCOO: solicitud.notasCOO,
          correoSupervisor: solicitud.correoSupervisor,
          fechaInicio: carta.fechaInicio,
          fechaTermino: carta.fechaTermino,
          tareas: carta.tareas,
          informe: solicitud.informe,
          memoria: solicitud.memoria,
        };
      })
    );
    console.log("5");

    return res.status(200).json({
      message: 'Solicitudes encontradas exitosamente',
      solicitudes: solicitudesWithDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};

// Al reves 🔃
const supXest = async (req, res) => {
  try {
    const { token } = req.body;
    const usuario = await jwt.verify(token, key);

    const supervisor = await db.supervisor.findOne({
      where: { correoSupervisor: usuario.correoSupervisor },
    });

    const solicitudes = await db.solicitud.findAll({
      where: { correoSupervisor: supervisor.correoSupervisor },
    });

    return res.status(200).json({
      message: 'Solicitudes encontradas exitosamente',
      solicitudes,
    });

    /*
        const empresa = await db.empresa.findOne(
          {where: { rutEmpresa : supervisor.rutEmpresa }}
        );
      const practicantes = await db.solicitud.findAll(
          {where: { rutEmpresa:empresa.rutEmpresa }}
        );
      return res.status(200).json({
          message: "Solicitudes listadas exitosamente",
          practicantes
      });
      */
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

const crearSolicitud = async (req, res) => {
  const { token, datos } = req.body;
  const { rut } = jwt.verify(token, key);
  const numeroPractica = datos.numeroPractica;
  const solicitudCalificada = await db.solicitud.findOne({
    where: { rut, fase: 9, numeroPractica }, // En entero, la fase calificada es 5
  });
  const solicitudAceptada = await db.solicitud.findOne({
    where: { rut, fase: 6, numeroPractica }, // En entero, la fase aceptada es 3
  });
  const solicitudPracticaAnteriorNoTerminada = await db.solicitud.findOne({
    where: {
      rut,
      fase: { [Op.not]: [5, 6, 7] },
      numeroPractica: numeroPractica - 1,
    }, // Revisar
  });
  const solicitudMismaempresa = await db.solicitud.findOne({
    where: {
      rut,
      rutEmpresa: datos.rutEmpresa}
  });

  if (solicitudCalificada) {
    return res.status(409).json({
      message: 'Ya se ha realizado esta práctica profesional',
    });
  } else if (solicitudAceptada) {
    return res.status(409).json({
      message: 'Ya se ha aceptado esta práctica profesional',
    });
  } else if (solicitudPracticaAnteriorNoTerminada) {
    return res.status(409).json({
      message: 'Aun no se termina la práctica profesional anterior',
    });
  } else if (solicitudMismaempresa) {
    return res.status(409).json({
      message: 'Ya se ha solicitado una práctica profesional en esta empresa',
    });
  }

  try {
    const solicitud = await db.solicitud.create({
      rut,
      rutEmpresa: datos.rutEmpresa,
      fechaSolicitud: new Date(),
      numeroPractica: datos.numeroPractica,
      fase: 1,
    });

    return res.status(201).json({
      message: 'Solicitud creada exitosamente',
      solicitud,
    });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    return res.status(500).json({
      message: 'Error interno del servidor al crear la solicitud',
    });
  }
};

const eliminarSolicitud = async (req, res) => {
  const { token, idSolicitud } = req.body;

  try {
    const { rut } = jwt.verify(token, key);

    const solicitud = await db.solicitud.findOne({
      where: { idSolicitud: idSolicitud },
    });

    

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    if (solicitud.rut !== rut) {
      return res.status(409).json({
        message: 'No tienes permisos para eliminar esta solicitud',
      });
    }

    await solicitud.destroy();
    return res.status(200).json({
      message: 'Solicitud eliminada exitosamente',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};

const faseSolicitud = async (req, res) => {
  const id = req.params.id;

  try {
    const { fase, rechazo } = req.body;

    const solicitud = await db.solicitud.findOne({
      where: { idSolicitud: id },
    });

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    if (solicitud.fase === 3) {
      if (
        solicitud.supervisorCheck === false ||
        solicitud.alumnoCheck === false
      ) {
        return res.status(409).json({
          message: 'Solicitud no se encuentra lista para avanzar de fase',
        });
      }
    }

    solicitud.fase = fase;
    if (fase === 7) {
      solicitud.descripcionRechazo = rechazo;
    }

    await solicitud.save();

    return res.status(200).json({
      message: 'Solicitud cambiada de fase exitosamente',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};

const verSolicitudesUsuario = async (req, res) => {
  try {
    const { token } = req.body;
    const usuario = await jwt.verify(token, key);
    const solicitudes = await db.solicitud.findAll({
      where: { rut: usuario.rut },
    });
    return res.status(200).json({
      message: 'Solicitudes listadas exitosamente',
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al listar las solicitudes',
      err,
    });
  }
};

// Vista usuario
const verSolicitudesAceptadasU = async (req, res) => {
  try {
    const { rut } = req.body;
    const solicitudes = await db.solicitud.findAll({
      where: { rut: rut, fase: 4 },
    });
    const solicitudList = solicitudes.map((solicitud) => {
      return {
        idSolicitud: solicitud.idSolicitud,
        numeroPractica: solicitud.numeroPractica,
        fase: solicitud.fase,
      };
    });
    return res.status(200).json({
      message: 'Solicitudes listadas exitosamente',
      solicitudList,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al listar las solicitudes',
      err,
    });
  }
};
// COORDINADOR
const allSolicitudesCoo = async (req, res) => {
  const {token} = req.body;
  const coordinador = await jwt.verify(token, key);
  if (coordinador.tipoUsuario !== 2) {
    return res.status(401).json({
      message: 'No tienes permisos para ver las solicitudes',
    });
  }
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase:  [5, 8] } });
    return res.status(200).json({
      message: 'Solicitudes listadas exitosamente',
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al listar las solicitudes',
      err,
    });
  }
};

const mostrarNotasCoo = async (req, res) => {
  const {token,idSolicitud} = req.body;
  const coordinador = await jwt.verify(token, key);
  if (coordinador.tipoUsuario !== 2) {
    return res.status(401).json({
      message: 'No tienes permisos para ver las solicitudes',
    });
  }
  try{
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    return res.status(200).json({
      message: 'Solicitud encontrada',
      notasCOO: solicitud.notasCOO,
    });

  }
  catch(err){
    return res.status(500).json({
      message: 'Error interno del servidor al mostrar las notas del coordinador',
      err,
    });
  };

};

const modificarNotasCoo = async (req, res) => {
  const { idSolicitud, nuevasNotas } = req.body;

  try {
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    const notasActuales = solicitud.notasCOO || [];
    const nuevasNotasMap = nuevasNotas.reduce((map, nota) => {
      map[nota.id] = nota;
      return map;
    }, {});

    const notasFiltradas = notasActuales
      .filter(nota => nuevasNotasMap[nota.id])
      .map(nota => {
        const nuevaNota = nuevasNotasMap[nota.id];
        return {
          ...nota,
          title: nuevaNota.title || nota.title,
          content: nuevaNota.content || nota.content,
        };
      });

    const notasAgregadas = nuevasNotas.filter(nota => !notasActuales.some(n => n.id === nota.id));

    solicitud.notasCOO = [...notasFiltradas, ...notasAgregadas];
    await solicitud.save();

    return res.status(200).json({
      message: 'Notas del coordinador modificadas exitosamente',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor al modificar las notas del coordinador',
      err,
    });
  }
};
// Vista Jefe de Carrera
const allSolicitudesJefe = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: 2 } });
    return res.status(200).json({
      message: 'Solicitudes listadas exitosamente',
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al listar las solicitudes',
      err,
    });
  }
};

// Vista Secretaria // No implementada
const allSolicitudesSec = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: 1 } });
    
    return res.status(200).json({
      message: 'Solicitudes listadas exitosamente',
      solicitudes,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error al listar las solicitudes',
      err,
    });
  }
};

const readySupervisor = async (req, res) => {
  const { idSolicitud } = req.body;

  try {
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    if (solicitud.supervisorCheck == true) {
      return res.status(409).json({
        message: 'Solicitud ya fue marcada como lista por el supervisor',
      });
    }

    if (solicitud.fase == 2) {
      solicitud.supervisorCheck = true;
      await solicitud.save();

      return res.status(200).json({
        message: 'Solicitud actualizada exitosamente. Supervisor listo.',
      });
    } else {
      return res.status(409).json({
        message: 'Solicitud no se encuentra en la fase correcta',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};

const readyAlumno = async (req, res) => {
  const { idSolicitud } = req.body;

  try {
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }

    if (solicitud.fase == 2) {
      solicitud.alumnoCheck = true;
      await solicitud.save();

      return res.status(200).json({
        message: 'Solicitud actualizada exitosamente. Alumno listo.',
      });
    } else {
      return res.status(409).json({
        message: 'Solicitud no se encuentra en la fase correcta',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};

// aplicar solo usarios con el token de admin pueden usar esta funcion.
const actualizarFase = async (req, res) => {
    const {Token}=req.body;
    const usuario = await jwt.verify(Token, key);
    if (usuario.tipoUsuario === 1 || usuario.tipoUsuario === 0) {
      return res.status(401).json({
        message: 'No tienes permisos para actualizar la fase',
      });
    }
    const { idSolicitud, nroFase, motivoRechazo } = req.body;

    try {
      const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });

      if (!solicitud) {
        return res.status(404).json({
          message: 'Solicitud no encontrada',
        });
      }

      if (motivoRechazo && nroFase===0) {
        solicitud.descripcionRechazo = motivoRechazo;
      }

      solicitud.fase = nroFase;
      await solicitud.save();

      return res.status(200).json({
        message: 'Se realizo correctamente el cambio de fase.',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Error interno del servidor',
        err,
      });
    }
};

// Eliminar mail send
const agregarSup = async (req, res) => {

  const { token, idSolicitud, correoSupervisor } = req.body;
  const rut = await jwt.verify(token, key);
  const usuario = await db.usuario.findOne({ where: { rut: rut.rut } });

  const solicitud = await db.solicitud.findOne({
    where: { idSolicitud: idSolicitud },
  });

  if (!solicitud) {
    return res.status(404).json({
      message: 'Solicitud no encontrada',
    });
  }

  const supervisor = await db.supervisor.findOne({
    where: { correoSupervisor: correoSupervisor },
  });

  if (!supervisor) {
    const pass = await TOKEN.passSUP(correoSupervisor);
    const crearSupervisor = await db.supervisor.create({
      correoSupervisor,
      rutEmpresa: solicitud.rutEmpresa,
      password: pass,
    });
    if (!crearSupervisor) {
      return res.status(500).json({
        message: 'Error al crear supervisor',
      });
    }
    solicitud.correoSupervisor = correoSupervisor;
    solicitud.fase = 4;
    const save=await solicitud.save();
    if (!save) {
      return res.status(500).json({
        message: 'Error al guardar supervisor',
      });
    }
    try {
      const mailOptions = {
        from: MAIL_USER,
        to: correoSupervisor,
        subject: `Practica profesional de ${usuario.nombre1} ${usuario.apellido1} ${usuario.apellido2} `,
        text: `Se te ha creado un perfil en el sistema de practica profesional de la Universidad de valparaiso, 
        su nombre de usuario es su correo de contacto (${correoSupervisor}) y su contraseña es ${pass}`,
      };
      transporter.sendMail(mailOptions);
    }
    catch (err) {
      return res.status(500).json({
        message: 'Error al enviar el correo',
        err,
      });
    }
    return res.status(200).json({
      message: 'Supervisor agregado correctamente',
      solicitud,
    });
  }else{
    solicitud.correoSupervisor = correoSupervisor;
    solicitud.fase = 4;
    const save=await solicitud.save();
    if (!save) {
      return res.status(500).json({
        message: 'Error al guardar supervisor',
      });
    }
    try {
      const mailOptions = {
        from: MAIL_USER,
        to: correoSupervisor,
        subject: `Practica profesional de ${usuario.nombre1} ${usuario.apellido1} ${usuario.apellido2} `,
        text: `Se te ha agregado a la practica profesional de la Universidad de de valparaiso`
      };
      transporter.sendMail(mailOptions);
    }
    catch (err) {
      return res.status(500).json({
        message: 'Error al enviar el correo',
        err,
      });
    }
    return res.status(200).json({
      message: 'Supervisor asignado correctamente',
      solicitud,
    });
  }

};

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    text,
  };
  return transporter.sendMail(mailOptions);
};

const processSolicitud = async (element) => {
  try {
    const [usuario, empresa, carta] = await Promise.all([
      db.usuario.findOne({ where: { rut: element.rut } }),
      db.empresa.findOne({ where: { rutEmpresa: element.rutEmpresa } }),
      db.carta.findOne({ where: { idSolicitud: element.idSolicitud } }),
    ]);

    const fechaHoy = new Date();
    const fechaLimite = new Date(fechaHoy.getTime() + 20 * 24 * 60 * 60 * 1000);

    if (element.fase === 7 && fechaLimite >= carta.fechaTermino) {
      const memoria = await db.memoria.findOne({
        where: { idSolicitud: element.idSolicitud },
      });

      if (!memoria || !memoria.documento) {
        await sendMail(
          usuario.correo,
          `Tu práctica en ${empresa.razonSocial} fue rechazada`,
          'No se envió memoria'
        );
        element.fase = 0;
        await element.save();
      }

    } else if (
      fechaLimite.toDateString() === carta.fechaTermino.toDateString()
    ) {
      await sendMail(
        usuario.correo,
        `Tu práctica en ${empresa.razonSocial} termina hoy`,
        'recordatorio enviar memoria en 20 días hábiles'
      );
      await sendMail(
        carta.correoSupervisor,
        `La práctica de ${usuario.nombre1} ${usuario.apellido1} ${usuario.apellido2} termina hoy`,
        'recordatorio enviar evaluación en 20 días hábiles'
      );
      element.fase = 7;
      await element.save();

    } else if (fechaHoy >= carta.fechaInicio) {
      await sendMail(
        usuario.correo,
        `Tu práctica profesional en ${empresa.razonSocial} comienza hoy`,
        'recordatorio empieza práctica'
      );
      await sendMail(
        carta.correoSupervisor,
        `La práctica de ${usuario.nombre1} ${usuario.apellido1} ${usuario.apellido2} comienza hoy`,
        'recordatorio empieza práctica de alumno'
      );
      element.fase = 6;
      await element.save();
    }

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);

  }
};


const fechaauto = async (req, res) => {
  try {
    const solicitudes = await db.solicitud.findAll({ where: { fase: [6, 7] } });
    await Promise.all(solicitudes.map(processSolicitud));
    return res.status(200).json({
      message: 'Solicitudes procesadas exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error,
    });
  }
};
const check = async (req, res) => {
  const { idSolicitud } = req.body;
  try {
    const solicitud = await db.solicitud.findOne({ where: { idSolicitud } });
    if (!solicitud) {
      return res.status(404).json({
        message: 'Solicitud no encontrada',
      });
    }
    if (solicitud.fase === 4) {
      solicitud.alumnoCheck = true;
      solicitud.fase = 5;
      await solicitud.save();
      return res.status(200).json({
        message: 'Solicitud actualizada exitosamente. Alumno listo.',
      });
    } else {
      return res.status(409).json({
        message: 'Solicitud no se encuentra en la fase correcta',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      err,
    });
  }
};
module.exports = {
  fechaauto,
  supXest,
  crearSolicitud,
  eliminarSolicitud,
  faseSolicitud,
  verSolicitudesUsuario,
  verSolicitudesAceptadasU,
  allSolicitudesCoo,
  allSolicitudesJefe,
  allSolicitudesSec,
  readyAlumno,
  readySupervisor,
  actualizarFase,
  agregarSup,
  buscarFase,
  mostrarNotasCoo,
  modificarNotasCoo,
  todasPracticas,
  check,
};
