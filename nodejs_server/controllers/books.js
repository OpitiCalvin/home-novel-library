const Book = require("../models/Book");
const Author = require("../models/Author");
const BookImage = require("../models/BookImage");
const Genre = require("../models/Genre");
const Book_Genre = require("../models/BookGenre");

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

exports.getBookImages = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findByPk(bookId);
  if (!book) {
    return res
      .status(404)
      .json({ message: `Book not found with id ${bookId}` });
  }
  const bookImages = await BookImage.findAll({
    where: {
      bookId: bookId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).json({ images: bookImages });
};

exports.createBook = async (req, res, next) => {
  const {
    title,
    publishedYear,
    isbn,
    availabilityStatus,
    readStatus,
    description,
    authorId,
    genres,
  } = req.body;

  let bookGenres;
  try {
    const book = await Book.create({
      title: title,
      publishedYear: publishedYear,
      isbn: isbn,
      availabilityStatus: availabilityStatus,
      readStatus: readStatus,
      description: description,
      authorId: authorId,
    });

  if(genres !== undefined) {
    bookGenres = await Genre.findAll({ where: { id: genres } });
  }

    if (bookGenres.length > 0) {
      book.addGenres(bookGenres).then((result) => {
        res.status(201).json({
          message: "Book created successfully.",
          book: book,
          genres: bookGenres,
        });
      }).catch(e => console.log(e));
    } else {
      res.status(201).json({
        message: "Book created successfully.",
        book: book,
      });
    }
  } catch (error){
    console.log(error);
  }
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.id;
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
