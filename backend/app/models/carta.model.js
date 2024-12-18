const { informe, memoria } = require(".");

module.exports = (sequelize, Sequelize) =>{

    const carta = sequelize.define('carta', {

      idAceptacion: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
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
          type: Sequelize.JSON,
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
        idInforme: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        idmemoria: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
    }, 
    {
      // Opciones adicionales
      tableName: 'carta',
      freezeTableName: true,
    });

    return carta;
    
};
