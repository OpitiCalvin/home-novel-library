import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class BookImage extends Model {
  declare id: number;
  declare filename: string;
  declare filepath: string;
  declare mimetype: string;
  declare size: number;
  declare encoding: string;
  // declare book_id: number;

  // static associate(models) {
  //   BookImage.belongsTo(models.Book);
  // }
}

BookImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
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

export default BookImage;
