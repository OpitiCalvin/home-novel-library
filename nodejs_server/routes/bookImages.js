const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/book_image");
const path = require("path");

const multer = require("multer");
const upload = multer({
  dest: "./uploads",
  limits: { fileSize: 5000000 },
  fileFilter: (req, files, cb) => {
    checkFileType(files, cb);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png");
  }
};

const router = express.Router();

// get all book images
router.get("/", controller.getImages);

// create a book image entry
router.post("/", upload.array("files", 5), controller.createBookImage);

router.get("/:id", controller.getImage)

router.delete("/:id", controller.deleteBookImage);

module.exports = router;
