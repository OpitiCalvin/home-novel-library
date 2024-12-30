import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Account extends Model {
  declare id: string;
  declare type: string;
  declare provider: string;
  declare providerAccountId: string;
  declare refresh_token: string;
  declare access_token: string;
  declare expires_at: string;
  declare token_type: string;
  declare scope: string;
  declare id_token: string;
  declare session_state: string;
  declare userId: string;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: { type: DataTypes.STRING, allowNull: false },
    provider: { type: DataTypes.STRING, allowNull: false },
    providerAccountId: { type: DataTypes.STRING, allowNull: false },
    refresh_token: { type: DataTypes.STRING },
    access_token: { type: DataTypes.STRING },
    expires_at: { type: DataTypes.INTEGER },
    token_type: { type: DataTypes.STRING },
    scope: { type: DataTypes.STRING },
    id_token: { type: DataTypes.TEXT },
    session_state: { type: DataTypes.STRING },
    // userId: { type: DataTypes.UUID },
  },
  {
    sequelize,
    modelName: "Account",
    tableName: "Account",
    timestamps: false,
  }
);

export default Account;
