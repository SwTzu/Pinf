module.exports = (sequelize, Sequelize)=> {
  const supervisor= sequelize.define('supervisor', {
    correoSupervisor: {
      type: Sequelize.STRING(45),
      primaryKey: true
    },
    rutEmpresa: {
      type: Sequelize.STRING(12),
      allowNull: true,
    },
    nombre: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    telefono: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    cargoAdministrativo: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    titulocargo: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    verificadoCheck: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    // Opciones adicionales
    tableName: 'supervisor',
    freezeTableName: true,
  });
  return supervisor;
};

// Signup con correo, rutEmpresa
