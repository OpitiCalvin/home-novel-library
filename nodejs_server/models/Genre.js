const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Genre = sequelize.define("Genre", {
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
});

module.exports = Genre;
