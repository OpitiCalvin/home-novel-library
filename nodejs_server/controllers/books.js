const { title } = require("process");
const Book = require("../models/Book");
const path = require("path");
const Author = require("../models/Author");
const BookImage = require("../models/BookImage");

// get all books
exports.getBooks = (req, res, next) => {
  Book.findAll({
    include: [
      {
        model: Author,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: BookImage,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((books) => {
      res.status(200).json({ books: books });
    })
    .catch((err) => console.log(err));
};

exports.getBook = (req, res, next) => {
  const bookId = req.params.id;
  Book.findByPk(bookId, {
    include: [
      {
        model: Author,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: BookImage,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found!" });
      }
      res.status(200).json({ book: book });
    })
    .catch((err) => console.log(err));
};

exports.createBook = async (req, res, next) => {
  Book.create({
    title: req.body.title,
    publishedYear: req.body.publishedYear,
    isbn: req.body.isbn,
    availabilityStatus: req.body.availabilityStatus,
    readStatus: req.body.readStatus,
    description: req.body.description,
    authorId: req.body.authorId,
  })
    .then((result) => {
      res
        .status(201)
        .json({ message: "Book created successfully.", book: result });
    })
    .catch((err) => console.log(err));
  // res.status(201).json({ message: "Book created successfully.", book: {} });
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.id;
  // TODO: Handle this better
  const {
    title,
    authorId,
    genreId,
    publishedYear,
    isbn,
    description,
    availabilityStatus,
    readStatus,
  } = req.body;

  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      // TODO: handle better
      book.title = title;
      book.author_id = authorId;
      book.genre_id = genreId;
      book.published_year = publishedYear;
      book.isbn = isbn;
      book.description = description;
      book.availability_status = availabilityStatus;
      book.read_status = readStatus;
      return book.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Book updated!", book: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.id;
  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        res.status(404).json("Book not found!");
      }
      return Book.destroy({
        where: {
          id: bookId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Book deleted!" });
    })
    .catch((err) => console.log(err));
};
