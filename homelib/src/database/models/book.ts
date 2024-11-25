import { Model, DataTypes } from "sequelize";
import sequelize from ".";
// import BookImage from "./bookImage";
// import Genre from "./genre";
// import BookGenre from "./bookGenre";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare publishedYear: number;
  declare isbn: string;
  declare description: string;
  declare availabilityStatus: string;
  declare readStatus: string;

  static associate(models) {
    Book.hasMany(models.BookImage, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    Book.belongsTo(models.Author);
  }
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
    // authorId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize,
    // modelName: "Book",
    tableName: "books",
    underscored: true,
  }
);

// Book.hasMany(BookImage, {
//   onDelete: "CASCADE",
//   foreignKey: {
//     allowNull: false,
//   },
// });
// BookImage.belongsTo(Book);
// Book.belongsToMany(Genre, { through: BookGenre });

export default Book;
