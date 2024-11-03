const User = require("../models/User");

// get all users
exports.getUsers = (req, res, next) => {
  Author.findAll()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res, next) => {};

exports.createUser = (req, res, next) => {};

exports.updateUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};
