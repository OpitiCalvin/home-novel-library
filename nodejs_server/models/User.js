const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Member"),
      defaultValue: "Member",
      allowNull: false,
    },
  },
  {
    modelName: "users",
    underscored: true,
  }
);

module.exports = User;
