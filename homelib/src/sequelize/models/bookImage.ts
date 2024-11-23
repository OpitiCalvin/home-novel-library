import { Model } from "sequelize";

const BookImage = (sequelize, DataTypes) => {
  class BookImage extends Model {}
  BookImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filepath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      encoding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BookImage",
      tableName: "book_images",
      underscored: true,
    }
  );
  return BookImage;
};

export default BookImage;