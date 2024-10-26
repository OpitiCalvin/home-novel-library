const express = require("express");
const controller = require("../controllers/genre");
const auth = require("../middleware/auth");

const router = express.Router();

// get all Genres
router.get("/", controller.getGenres);

// get a specific Genre
router.get("/:id", controller.getGenre);

// create a new Genre
router.post("/", controller.createGenre);

// update a Genre
router.put("/:id", controller.updateGenre);

// Delete a Genre
router.delete("/:id", controller.deleteGenre);

module.exports = router;
