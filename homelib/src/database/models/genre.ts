import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Genre extends Model {
  declare id: number;
  declare name: string;
  declare category: string;
  declare description: string;

  // static associate(models){
  //   Genre.belongsToMany(models.Book, { through: models.BookGenre });
  // }
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
    modelName: "genre", // Name of the model
    tableName: "genres", // Explicit table name
    underscored: true, // Converts camelCase field names to snake_case in the database
  }
);

export default Genre;
