import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class VerificationToken extends Model {
  declare indentifier: string;
  declare token: string;
  declare expires: Date;
}

VerificationToken.init(
  {
    token: { type: DataTypes.STRING, primaryKey: true },
    identifier: { type: DataTypes.STRING, allowNull: false },
    expires: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "VerificationToken",
    tableName: "VerificationToken",
    timestamps: false,
  }
);
export default VerificationToken;