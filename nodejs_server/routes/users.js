const express = require("express");
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();

// get all users
router.get("/", auth, controller.getUsers);

// get a specific user
router.get("/:id", auth, controller.getUser);

// create a new user
router.post("/", auth, controller.createUser);

// update a user
router.put("/:id", auth, controller.updateUser);

// Delete a user
router.delete("/:id", auth, controller.deleteUser);

module.exports = router;
