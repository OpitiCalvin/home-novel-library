import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare publishedYear: number;
  declare isbn: string;
  declare description: string;
  declare availabilityStatus: string;
  declare readStatus: string;

  // static associate(models) {
  //   Book.hasMany(models.BookImage, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   Book.belongsTo(models.Author);
  //   Book.hasOne(models.Author);
  // }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(15),
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
    sequelize,
    modelName: "book",
    tableName: "books",
    underscored: true,
  }
);

export default Book;
