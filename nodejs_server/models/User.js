const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Member"),
      allowNull: false,
    },
  },
  {
    modelName: "users",
    underscored: true,
  }
);

module.exports = User;
