import { Model, DataTypes } from "sequelize";
import sequelize from ".";
import Book from "./book";
import Genre from "./genre";

class BookGenre extends Model {
  // static associate(models) {
  //   BookGenre.belongsToMany(models.Genre, { through: models.Book_Genre });
  //   BookGenre.belongsToMany(models.Book, { through: models.Book_Genre });
  // }
}

BookGenre.init(
  {},
  {
    sequelize,
    // modelName: "BookGenre",
    tableName: "book_genres",
    underscored: true,
    timestamps: false,
  }
);
Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

export default BookGenre;
