const express = require("express");
const controller = require("../controllers/user");
const {auth, adminAuth, userAuth} = require("../middleware/auth");

const router = express.Router();

// get all users
router.get("/",  controller.getUsers);

// get a specific user
router.get("/:id", controller.getUser);

// create a new user
router.post("/register", controller.register);

// login route
router.post("/login", controller.login)

// update a user
router.put("/updateUser", adminAuth, controller.updateUser);

// Delete a user
router.delete("/deleteUser", adminAuth, controller.deleteUser);

module.exports = router;
