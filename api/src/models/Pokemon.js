const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //! VERIFICAR TIPO DE DATOS QUE LLEGUEN UNA VEZ QUE AVANCE MAS EN EL PROYECTO
  sequelize.define('Pokemon', { //* cambie pokemon por Pokemon
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true // Puede ser ovbiada porque la primaryKey ya contiene esta propiedad
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true // Verificar si la imagen llegara como url para mantener esta propiedad
    },
    life: {
      type: DataTypes.STRING
    },
    stroke: {
      type: DataTypes.STRING
    },
    defending: {
      type: DataTypes.STRING
    },
    speed: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.STRING
    }
  }, { timestamps: true });
};
