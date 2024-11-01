const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Genre = require("./Genre");
const BookImage = require("./BookImage");

const Book = sequelize.define(
  "book",
  {
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
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT,
    availabilityStatus: {
      type: DataTypes.ENUM("Available", "Loaned Out"),
      defaultValue: "Available",
    },
    readStatus: {
      type: DataTypes.ENUM("Not Started", "In Progress", "Finished", "Stopped"),
      defaultValue: "Not Started",
    },
  },
  {
    modelName: "books",
    underscored: true,
  }
);

Book.hasMany(BookImage, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
BookImage.belongsTo(Book);
Book.belongsToMany(Genre, { through: "book_genres", timestamps: false });
Genre.belongsToMany(Book, { through: "book_genres", timestamps: false });

module.exports = Book;
