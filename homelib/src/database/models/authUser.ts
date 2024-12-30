import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
    emailVerified: { type: DataTypes.DATE },
    image: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
  }
);

export default User;
