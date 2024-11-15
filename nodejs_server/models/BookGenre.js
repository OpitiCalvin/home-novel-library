const sequelize = require(".");
const Genre = require("./Genre");
const Book = require("./Book");


const Book_Genre = sequelize.define("book_genre", {}, {
    modelName: "book_genres",
    underscored: true,
    timestamps: false
  })
Book.belongsToMany(Genre, { through: Book_Genre });
Genre.belongsToMany(Book, { through: Book_Genre });

module.exports = Book_Genre;