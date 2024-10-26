const Book = require("../models/Book");

// get all books
exports.getBooks = (req, res, next) => {
  Book.findAll({ include: ["genre", "author"] })
    .then((books) => {
      res.status(200).json({ books: books });
    })
    .catch((err) => console.log(err));
};

exports.getBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found!" });
      }
      res.status(200).json({ book: book });
    })
    .catch((err) => console.log(err));
};

exports.createBook = (req, res, next) => {
  Book.create({
    title: req.body.title,
    author_id: req.body.author_id,
    genre_id: req.body.genre_id,
    published_year: req.body.published_year,
    isbn: req.body.isbn,
    description: req.body.description,
    availability_status: req.body.availability_status,
    read_status: req.body.eead_status,
  })
    .then((result) => {
      console.log("Book created.");
      res
        .status(201)
        .json({ message: "Book created successfully.", book: result });
    })
    .catch((err) => console.log(err));
};

exports.updateBook = (req, res, next) => {
  const bookId = req.params.bookId;
  // TODO: Handle this better
  const updatedTitle = req.body.title;
  const updatedAuthorId = req.body.authorId;
  const updatedGenreId = req.body.genreId;
  const updatedPublishedYear = req.body.publishedYear;
  const updatedISBN = req.body.isbn;
  const updatedDescription = req.body.description;
  const updatedAvailabilityStatus = req.body.availabilityStatus;
  const updatedReadStatus = req.body.ReadStatus;

  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      // TODO: handle better
      book.title = updatedTitle;
      book.author_id = updatedAuthorId;
      book.genre_id = updatedGenreId;
      book.published_year = updatedPublishedYear;
      book.isbn = updatedISBN;
      book.description = updatedDescription;
      book.availability_status = updatedAvailabilityStatus;
      book.read_status = updatedReadStatus;
      return book.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Book updated!", book: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;
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
