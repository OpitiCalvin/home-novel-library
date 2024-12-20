import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { options } from "../config/db.config.mjs";
import pg from "pg";

const dbOptions = <SequelizeOptions>options;
dbOptions.dialectModule = pg;

const sequelize = new Sequelize(dbOptions);

export default sequelize;
