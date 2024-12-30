import { Model, DataTypes } from "sequelize";
import sequelize from "./connection";

class Session extends Model {
  declare id: string;
  declare expires: Date;
  declare sessionToken: string;
  declare userId: string;
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    expires: { type: DataTypes.DATE, allowNull: false },
    sessionToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    // userId: { type: DataTypes.UUID },
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "Session",
    timestamps: false,
  }
);
export default Session;