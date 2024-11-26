import { Model } from "sequelize";
import sequelize from "./connection";

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

export default BookGenre;
