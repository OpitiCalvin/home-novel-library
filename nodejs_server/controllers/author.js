const Author = require("../models/Author");
const Book = require("../models/Book");

// get all authors
exports.getAuthors = (req, res, next) => {
  Author.findAll()
    .then((authors) => {
      res.status(200).json({ authors: authors });
    })
    .catch((err) => console.log(err));
};

exports.getAuthor = (req, res, next) => {
  const authorId = req.params.id;
  Author.findByPk(authorId, {
    include: {
      model: Book,
      attributes: { exclude: ["authorId", "id", "createdAt", "updatedAt"] },
    },
  })
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found!" });
      }
      res.status(200).json({ author: author });
    })
    .catch((err) => console.log(err));
};

exports.createAuthor = (req, res, next) => {
  const { name, bio } = req.body;
  Author.create({
    name: name,
    bio: bio,
  })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Author created successfully.", author: result });
    })
    .catch((err) => console.log(err));
};

exports.updateAuthor = (req, res, next) => {
  const authorId = req.params.id;
  const { name, bio } = req.body;

  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      author.name = name;
      author.bio = bio;
      return author.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Author updated!", author: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteAuthor = (req, res, next) => {
  const authorId = req.params.id;
  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        res.status(404).json("Author not found!");
      }
      return Author.destroy({
        where: {
          id: authorId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Genre deleted!" });
    })
    .catch((err) => console.log(err));
};
