module.exports = (sequelize, Sequelize) =>{
  const informe= sequelize.define('informe evaluacion', {
    idInforme: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idSolicitud: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    formulario: {
      type: Sequelize.JSON,
      allowNull: true
    },
    fechaEnvio: {
      type: Sequelize.DATE,
      allowNull: true
    },
    nota: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    // Opciones adicionales
    tableName: 'informe evaluacion',
    freezeTableName: true,
  });
  return informe;
};


/*
{
  secciones:{
    sec1:{
      pregunta1:
      pregunta2:...
      nota:
    },
    sec2:{
      pregunta1:{
        opcion:
        comentario
      },
      pregunta2:{
        opcion:
        comentario
      },...
    },
    sec3:{
      comentario:
    }
  }
}
*/