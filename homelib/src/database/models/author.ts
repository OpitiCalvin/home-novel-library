import { Model, DataTypes } from "sequelize";
import sequelize from ".";
import Book from "./book";

class Author extends Model {
  declare id: number;
  declare name: string;
  declare bio: string;
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
    // modelName: "Author",
    tableName: "authors",
    underscored: true,
  }
);

Author.hasMany(Book, {
  onDelete: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});
Book.belongsTo(Author);

export default Author;
