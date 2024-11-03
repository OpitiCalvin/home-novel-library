const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Book = require("./Book");

const Author = sequelize.define(
  "author",
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
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    modelName: "authors",
    underscored: true,
  }
);

Author.hasMany(Book, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false
  }
});
Book.belongsTo(Author)

module.exports = Author;
