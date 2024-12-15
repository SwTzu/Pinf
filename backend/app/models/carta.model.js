const { informe, memoria } = require(".");

module.exports = (sequelize, Sequelize) =>{

    const carta = sequelize.define('carta de aceptacion', {

      idAceptacion: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        idSolicitud: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        correoSupervisor: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        tareas: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        area: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        fechaInicio: {
          type: Sequelize.DATE,
          allowNull: true
        },
        fechaTermino: {
          type: Sequelize.DATE,
          allowNull: true
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
        informe: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        memoria: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
    }, 
    {
      // Opciones adicionales
      tableName: 'carta de aceptacion',
      freezeTableName: true,
    });

    return carta;
    
};
