import { Model, DataTypes } from "sequelize";
import sequelize from ".";
import Book from "./book";
import BookGenre from "./bookGenre";

class Genre extends Model {
  /**
   * Define associations here if needed.
   * For example:
   * static associate(models) {
   *   this.hasMany(models.SomeOtherModel, { foreignKey: "genreId" });
   * }
   */
  declare id: number;
  declare name: string;
  declare category: string;
  declare description: string;
}

Genre.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "Genre", // Name of the model
    tableName: "genres", // Explicit table name
    underscored: true, // Converts camelCase field names to snake_case in the database
  }
);
Genre.belongsToMany(Book, { through: BookGenre });

export default Genre;
