const values = require("../config/const.js");
const Sequelize = require("sequelize");
require('dotenv').config({ path: '/app/env/.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX),
    min: parseInt(process.env.DB_POOL_MIN),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
    idle: parseInt(process.env.DB_POOL_IDLE)
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.area = require("./area.model.js")(sequelize, Sequelize);
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

db.solicitud.hasMany(db.memoria,{foreignKey:'idSolicitud', as: 'memorias'});
db.memoria.belongsTo(db.solicitud,{foreignKey:'idSolicitud', as: 'solicitud'});

db.solicitud.hasMany(db.carta,{foreignKey:'idSolicitud'});
db.carta.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});

db.supervisor.hasMany(db.carta,{foreignKey:'correoSupervisor'});
db.carta.belongsTo(db.supervisor,{foreignKey:'correoSupervisor'});

db.solicitud.hasMany(db.informe,{foreignKey:'idSolicitud'});
db.informe.belongsTo(db.solicitud,{foreignKey:'idSolicitud'});

db.carta.hasOne(db.memoria,{foreignKey:'idmemoria'});
db.memoria.belongsTo(db.carta,{foreignKey:'idmemoria'});

db.carta.hasOne(db.informe,{foreignKey:'idInforme'});
db.informe.belongsTo(db.carta,{foreignKey:'idInforme'});

module.exports = db;