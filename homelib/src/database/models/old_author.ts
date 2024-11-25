import { Model } from "sequelize";
// import Book from "./book";

const Author = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Define associations here if needed.
     * For example:
     * static associate(models) {
     *   this.hasMany(models.SomeOtherModel, { foreignKey: "genreId" });
     * }
     */
    // static associate(models) {
    //   Author.hasMany(models.Book, {
    //     onDelete: "CASCADE",
    //     foreignKey: {
    //       // name: "author_id",
    //       allowNull: false,
    //     },
    //   });
    // }
  }
  Author.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Author",
      tableName: "authors",
      underscored: true,
    }
  );
  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      onDelete: "CASCADE",
      foreignKey: {
        // name: "author_id",
        allowNull: false,
      },
    });
  }
  return Author;
};

export default Author;
