import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Author extends Model {
  declare id: number;
  declare name: string;
  declare bio: string;

  // static associate(models) {
  //   Author.hasMany(models.Book, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false,
  //       // name: "author_id",
  //     },
  //   });
  //   models.Book.belongsTo(Author);
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "author",
    tableName: "authors",
    underscored: true,
  }
);

export default Author;
