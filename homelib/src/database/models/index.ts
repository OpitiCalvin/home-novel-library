import Author from "./author";
import Book from "./book";
import BookGenre from "./bookGenre";
import BookImage from "./bookImage";
import Genre from "./genre";
import User from "./user";

// Associations
Book.belongsTo(Author, {foreignKey: "authorId"});
Author.hasMany(Book, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "authorId"
  },
});
Book.hasMany(BookImage, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "bookId",
  },
});
BookImage.belongsTo(Book, { foreignKey: "bookId" });
Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

export { Genre, Author, Book, BookImage, BookGenre, User };
