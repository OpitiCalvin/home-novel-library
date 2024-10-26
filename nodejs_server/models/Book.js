const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Author = require("./Author");
const Genre = require("./Genre");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.TEXT,
  availability_status: {
    type: DataTypes.ENUM("Available", "Loaned Out"),
    defaultValue: "Available",
  },
  read_status: {
    type: DataTypes.ENUM("Not Started", "In Progress", "Finished", "Stopped"),
    defaultValue: "Not Started",
  },
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
});

Book.belongsTo(Genre, { 
  foreignKey: "genre_id",
  as: "genre" 
});

module.exports = Book;
