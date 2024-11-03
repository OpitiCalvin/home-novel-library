const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Loan = sequelize.define(
  "loan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: DataTypes.DATE,
  },
  {
    modelName: "loans",
    underscored: true,
  }
);

module.exports = Loan;
