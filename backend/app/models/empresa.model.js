module.exports = (sequelize, Sequelize) =>{

  const empresa = sequelize.define('empresa', {

    rutEmpresa: {
      type: Sequelize.STRING(12),
      primaryKey: true
    },
    razonSocial: {
      type: Sequelize.STRING(170),
      allowNull: true
    },
    ciudad: {
      type: Sequelize.STRING(45), // TEXT?
      allowNull: true
    },
    region: {
      type: Sequelize.STRING(45), // TEXT?
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING(170), // TEXT?
      allowNull: true
    },
    rubro: {
      type: Sequelize.STRING(170), // TEXT?
      allowNull: true
    },
    verificado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  }, {
    // Opciones adicionales
    tableName: 'empresa',
    freezeTableName: true,
  });

  return empresa;
  
};
