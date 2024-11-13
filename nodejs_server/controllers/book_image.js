const BookImage = require("../models/BookImage");
const fileForge = require("express-fileforge");
const path = require("path");
const fs = require("fs");

// get all book images
exports.getImages = (req, res, next) => {
  BookImage.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((bookImages) => {
      res.status(200).json({ bookImages: bookImages });
    })
    .catch((err) => console.log(err));
};

exports.getImage = (req, res, next) => {
  const bookImageId = req.params.id;
  BookImage.findByPk(bookImageId, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((bookImage) => {
      if (!bookImage) {
        return res.status(404).json({ message: "Book image not found!" });
      }
      res.status(200).json({ bookImage: bookImage });
    })
    .catch((err) => console.log(err));
};

exports.createBookImage = async (req, res, next) => {
  const { bookId } = req.body;
  const { files } = req;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No image files were uploaded." });
  }

  const bookImages = [];
  files.forEach((file) => {
    const { filename, path: filepath, mimetype, size, encoding } = file;
    bookImages.push({
      bookId: bookId,
      filename: filename,
      filepath: filepath,
      mimetype: mimetype,
      size: size,
      encoding: encoding,
    });
  });
  // console.log("Book Images", bookImages);

  BookImage.bulkCreate(bookImages)
    .then((results) => {
      res.status(201).json({
        message: "Book Images uploaded successfully.",
        bookImages: results,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateBookImage = (req, res, next) => {
  const bookImageId = req.params.id;
  const { filename, filepath, mimetype, size } = req.body;

  BookImage.findByPk(bookImageId)
    .then((bookImage) => {
      if (!bookImage) {
        return res.status(404).json({ message: "Book Image not found" });
      }
      bookImage.filename = filename;
      bookImage.filepath = filepath;
      bookImage.mimetype = mimetype;
      bookImage.size = size;

      return bookImage.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Book image updated!", bookImage: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteBookImage = (req, res, next) => {
  const bookImageId = req.params.id;
  BookImage.findByPk(bookImageId)
    .then((bookImage) => {
      if (!bookImage) {
        res.status(404).json("Book image not found!");
      }
      // use bookImage.filename to delete from uploads directory
      const uploadDir = path.join(__dirname, "uploads");
      const filePath = path.join(uploadDir, bookImage.filename);
      // check if file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return res.status(404).json({ error: "File not found" });
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting file" });
          }
        });
      });
      return BookImage.destroy({
        where: {
          id: bookImageId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Book deleted!" });
    })
    .catch((err) => console.log(err));
};
