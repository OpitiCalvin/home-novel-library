import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Member"),
      defaultValue: "Member",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    underscored: true,
  }
);

export default User;
