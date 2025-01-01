import Author from "./author";
import Book from "./book";
import BookGenre from "./bookGenre";
import BookImage from "./bookImage";
import Genre from "./genre";
// import User from "./user";
import User from "./authUser";
import Account from "./authAccount";
import Session from "./authSession";
import VerificationToken from "./authVerificationToken";

// Associations
Book.belongsTo(Author, { foreignKey: "authorId" });
Author.hasMany(Book, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "authorId",
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

User.hasMany(Account, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
Account.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Session, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
Session.belongsTo(User, { foreignKey: "userId" });
export { Genre, Author, Book, BookImage, BookGenre, User, Session, Account, VerificationToken };
