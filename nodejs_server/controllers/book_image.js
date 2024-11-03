const BookImage = require("../models/BookImage");
const fileForge = require("express-fileforge");
const path = require("path");

// get all book images
exports.getImages = (req, res, next) => {
  BookImage.findAll()
    .then((bookImages) => {
      res.status(200).json({ bookImages: bookImages });
    })
    .catch((err) => console.log(err));
};

exports.getImage = (req, res, next) => {
  const bookImageId = req.params.id;
  BookImage.findByPk(bookImageId)
    .then((bookImage) => {
      if (!bookImage) {
        return res.status(404).json({ message: "Book image not found!" });
      }
      res.status(200).json({ bookImage: bookImage });
    })
    .catch((err) => console.log(err));
};

exports.createBookImage = (req, res, next) => {
  const { filename, filepath, mimetype, size } = req.body;
  BookImage.create({
    filename: filename,
    filepath: filepath,
    mimetype: mimetype,
    size: size,
  })
    .then((result) => {
      res.status(201).json({
        message: "Book Image created successfully.",
        bookImage: result,
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

// export const uploadImage = async (req, filename) => {
exports.uploadImage = async (req) => {
  try {
    const baseDir = path.resolve(__dirname, "..", "upload");
    // const uploadedFile = await fileForge.saveFile(req,)
    return baseDir;
  } catch (error) {}
};
