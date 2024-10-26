const Genre = require("../models/Genre");

// get all genres
exports.getGenres = (req, res, next) => {
  Genre.findAll()
    .then((genres) => {
      res.status(200).json({ genres: genres });
    })
    .catch((err) => console.log(err));
};

exports.getGenre = (req, res, next) => {
  const genreId = req.params.genreId;
  Genre.findByPk(genreId)
    .then((genre) => {
      if (!genre) {
        return res.status(404).json({ message: "Genre not found!" });
      }
      res.status(200).json({ genre: genre });
    })
    .catch((err) => console.log(err));
};

exports.createGenre = (req, res, next) => {
  const name = req.body.name;
  Genre.create({
    name: name,
  })
    .then((result) => {
      console.log("Genre created.");
      res
        .status(201)
        .json({ message: "Genre created successfully.", genre: result });
    })
    .catch((err) => console.log(err));
};

exports.updateGenre = (req, res, next) => {};

exports.deleteGenre = (req, res, next) => {};
