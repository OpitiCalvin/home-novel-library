const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/books");

const router = express.Router();

// get all books
router.get("/", controller.getBooks);

// get a specific book
router.get("/:id", controller.getBook);

// create a new book
router.post("/", controller.createBook);

// update a book
router.put("/:id", controller.updateBook);

// Delete a book
router.delete("/:id", controller.deleteBook);

module.exports = router;
