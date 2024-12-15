module.exports = (sequelize, Sequelize) => {

    const Area = sequelize.define('Area', {
        idArea: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false,
            // unique: true // Para evitar áreas duplicadas
        }
    }, {
        tableName: 'areas',
        freezeTableName: true,
    });
  
    return Area;

};