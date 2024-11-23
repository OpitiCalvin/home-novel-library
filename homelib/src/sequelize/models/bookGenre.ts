import { Model } from "sequelize";

const BookGenre = (sequelize, DataTypes) => {
  class BookGenre extends Model {
    static associate(models) {
      this.belongsToMany(models.Genre, { through: Book_Genre });
      this.belongsToMany(models.Book, { through: Book_Genre });
    }
  }
  BookGenre.init(
    {},
    {
      sequelize,
      modelName: "BookGenre",
      tableName: "book_genres",
      underscored: true,
      timestamps: false,
    }
  );
  return BookGenre;
};
export default BookGenre