const Book = require("../models/Book");
const Book_Genre = require("../models/BookGenre");
const Genre = require("../models/Genre");

// get all genres
exports.getGenres = (req, res, next) => {
  Genre.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((genres) => {
      res.status(200).json({ genres: genres });
    })
    .catch((err) => console.log(err));
};

// get a single genre
exports.getGenre = (req, res, next) => {
  const genreId = req.params.id;
  Genre.findByPk(genreId, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((genre) => {
      if (!genre) {
        return res.status(404).json({ message: "Genre not found!" });
      }
      res.status(200).json({ genre: genre });
    })
    .catch((err) => console.log(err));
};

exports.getGenreAndBooks = (req, res, next) => {
  const genreId = req.params.id;
  Genre.findByPk(genreId, {
    include: {
      model: Book,
      attributes: {
        exclude: ["createdAt", "updatedAt", "book_genre"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((genre) => {
      if (!genre) {
        return res.status(404).json({ message: "Genre not found!" });
      }
      res.status(200).json({ genre: genre });
    })
    .catch((err) => console.log(err));
};

// create genre entry
exports.createGenre = (req, res, next) => {
  const { name, category, description } = req.body;
  console.log(req.body);
  Genre.create({
    name: name,
    category: category,
    description: description,
  })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Genre created successfully.", genre: result });
    })
    .catch((err) => console.log(err));
};

// update genre entry
exports.updateGenre = (req, res, next) => {};

// delete genre entry
exports.deleteGenre = (req, res, next) => {};
