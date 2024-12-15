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
        type: Sequelize.ENUM("Necesita", "No necesita", "Revisado"),
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
            4. Formularios//manufacturar carta de aceptacion junto a supervisor
            5. Coordinacion
            6. Iniciada
            7. Memoria
            8. Revision evaluación
            9. Finalizado
            */
        allowNull: true,
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
