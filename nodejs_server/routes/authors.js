const express = require("express");
const controller = require("../controllers/author");
const auth = require("../middleware/auth");

const router = express.Router();

// get all authors
router.get("/", controller.getAuthors);

// get a specific author
router.get("/:id", controller.getAuthor);

// get a specific author and books
router.get("/:id/books", controller.getAuthorAndBooks);

// create a new author
router.post("/", controller.createAuthor);

// update a author
router.put("/:id", controller.updateAuthor);

// Delete a author
router.delete("/:id", controller.deleteAuthor);

module.exports = router;
