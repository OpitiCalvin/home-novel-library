import { Model } from "sequelize";

const Book = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      this.hasMany(models.BookImage, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false,
        },
      });
      // this.hasOne(models.Author);
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
        type: DataTypes.ENUM(
          "Not Started",
          "In Progress",
          "Finished",
          "Stopped"
        ),
        defaultValue: "Not Started",
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      underscored: true,
    }
  );
  return Book;
};

export default Book;
