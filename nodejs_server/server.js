const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./models");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./config/logging");
const morganMiddleware = require("./middleware/requests_logging");

const userRoutes = require("./routes/users");
const authorRoutes = require("./routes/authors");
const genreRoutes = require("./routes/genres");
const bookRoutes = require("./routes/books");
const loanRoutes = require("./routes/loans");
const bookImagesRoutes = require("./routes/bookImages");

const PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(morganMiddleware);
app.use(cors());
app.use(cookieParser());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

// error handling
app.use((error, req, res, next) => {
  logger.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.use("/api/public", express.static("public"));

// test route
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

// CRUD routes
app.use("/api/auth", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/book-images", bookImagesRoutes);

// sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    logger.info("Successfully synchronized db.");
  })
  .catch((err) => {
    logger.error(
      `Failed to sync db on ${process.env.DB_HOST} - ${err.message}`
    );
  });

app.listen(PORT, () => {
  logger.info(`Server started and is running on port ${PORT}`);
});
