const values = require("../config/const.js");
const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(values.DB_NAME, values.DB_USER, values.DB_PASSWORD, {
  host: values.DB_HOST,
  dialect: values.DB_DIALECT,
  pool: {
    max: values.DB_POOL_MAX,
    min: values.DB_POOL_MIN,
    acquire: values.DB_POOL_ACQUIRE,
    idle: values.DB_POOL_IDLE
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.carta = require("./carta.model.js")(sequelize,Sequelize);
db.empresa = require("./empresa.model.js")(sequelize,Sequelize);
db.informe = require("./informe.model.js")(sequelize,Sequelize);
db.memoria = require("./memoria.model.js")(sequelize,Sequelize);
db.solicitud = require("./solicitud.model.js")(sequelize,Sequelize);
db.supervisor = require("./supervisor.model.js")(sequelize,Sequelize);
db.usuario = require("./usuario.model.js")(sequelize,Sequelize);

db.usuario.hasMany(db.solicitud,{foreignKey:'rut'});
db.solicitud.belongsTo(db.usuario,{foreignKey:'rut'});


db.empresa.hasMany(db.solicitud,{foreignKey:'rutEmpresa'});
db.solicitud.belongsTo(db.empresa,{foreignKey:'rutEmpresa'});


db.empresa.hasMany(db.supervisor,{foreignKey:'rutEmpresa'});
db.supervisor.belongsTo(db.empresa,{foreignKey:'rutEmpresa'});


db.solicitud.hasMany(db.memoria,{foreignKey:'idSolicitud'});
db.memoria.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});


db.solicitud.hasMany(db.carta,{foreignKey:'idSolicitud'});
db.carta.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});


db.supervisor.hasMany(db.carta,{foreignKey:'correoSupervisor'});
db.carta.belongsTo(db.supervisor,{foreignKey:'correoSupervisor'});


db.solicitud.hasMany(db.informe,{foreignKey:'idSolicitud'});
db.informe.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});

module.exports = db;