const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/book_image")
const multer = require("multer");
const upload = multer();

const router = express.Router();

// create a book image entry
router.post("/", upload.array("files", 5), controller.createBookImage);

module.exports = router;