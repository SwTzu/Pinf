module.exports = (sequelize, Sequelize) => {
  const solicitud = sequelize.define(
    'solicitud de practica',
    {
      idSolicitud: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rut: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      rutEmpresa: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      fechaSolicitud: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      extension: {                // Extension de alumno regular
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numeroPractica: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      descripcionRechazo: {
        type: Sequelize.STRING(170),
        allowNull: true,
      },
      fase: {
        type: Sequelize.INTEGER,
        /*
            0. Rechazado
            1. Solicitado
            2. Revisado
            3. Firmado
            4. Formularios
            5. Coordinacion
            6. Iniciada
            7. Memoria
            8. Revision evaluación
            9. Finalizado
            */
        allowNull: true,
      },
      supervisorCheck: {
        // A usar para el cambio de fase.
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      alumnoCheck: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      calificacion: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      correoSupervisor: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      notasCOO: {
        // Notas del COO
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      // Opciones adicionales
      tableName: 'solicitud',
      freezeTableName: true,
    }
  );
  return solicitud;
};
