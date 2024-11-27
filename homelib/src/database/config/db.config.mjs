// require("dotenv").config(); // Load environment variables

export const options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  // dialectModule: require("pg"),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  migrationsStorageTableName: "migrations",
};

// if (process.env.NODE_ENV === "production") {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: true,
//     },
//   };
// }

export default {
  development: options,
  test: options,
  production: options,
};
