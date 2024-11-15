const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Genre = sequelize.define(
  "genre",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: "genres",
    underscored: true,
  }
);

module.exports = Genre;
