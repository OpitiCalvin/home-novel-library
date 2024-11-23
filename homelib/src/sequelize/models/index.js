const { Sequelize } = require("sequelize");
// const config = require("../config/config.json")[
//   process.env.NODE_ENV || "development"
// ];
const config = require("../config/db.config");
import Author from "./author";
import Genre from "./genre";
import Book from "./book";
import BookGenre from "./bookGenre";
import BookImage from "./bookImage";

const db = {};

let sequelize;

if (!global._sequelize) {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
  global._sequelize = sequelize; // Store Sequelize instance globally
} else {
  sequelize = global._sequelize;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import your models here
// db.Genre = require("./genre")(sequelize, Sequelize);
db.Genre = Genre(sequelize, Sequelize);
db.Author = Author(sequelize, Sequelize);
db.Book = Book(sequelize, Sequelize);
db.BookGenre = BookGenre(sequelize, Sequelize);
db.BookImage = BookImage(sequelize, Sequelize);

// module.exports = db;
export default db;
