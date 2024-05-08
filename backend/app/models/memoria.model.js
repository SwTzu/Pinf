module.exports = (sequelize, Sequelize) =>{
  const memoria= sequelize.define('memoria', {
    idmemoria: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idSolicitud: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    documento: {
      type: Sequelize.BLOB,
      allowNull: true
    },
    fechaEnvio: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    // Opciones adicionales
    tableName: 'memoria',
    freezeTableName: true,
  });
  return memoria;
};
