const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// get all users
exports.getUsers = (req, res, next) => {
  User.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "id", "passwordHash"],
    },
  })
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res, next) => {};

exports.register = async (req, res, next) => {
  const { email, username, password } = req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        email,
        passwordHash: hash,
      })
        .then((user) => {
          const maxAge = 2 * 60 * 60;
          const token = jwt.sign(
            {
              id: user.id,
              username,
              role: user.role,
            },
            jwtSecret,
            { expiresIn: maxAge }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 2hrs in ms
          });
          res
            .status(201)
            .json({ message: "User successfully created.", user: user.id });
        })
        .catch((error) => {
          res.status(401).json({
            message: "User not successsfully created.",
            error: error.message,
          });
        });
    });
  } catch (error) {
    res.status(401).json({
      message: "User not successsfully created.",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  // check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and Password not present",
    });
  }
  try {
    const user = await User.findOne({ where: {username: username}});
    if (!user) {
      res
        .status(401)
        .json({ message: "Login not successful", error: "User not found" });
    } else {
      // compare given password and hashed password
      bcrypt.compare(password, user.passwordHash).then((result) => {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 2hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 2hrs in ms
          });
          res.status(200).json({
            message: "Login successful",
            user: user._id,
          });
        } else {
          res.status(400).json({ message: "Login not successful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { role, id } = req.body;

  if (role && id) {
    if (role === "Admin") {
      await User.findByPk(id)
        .then((user) => {
          if (user.role !== "Admin") {
            user.role = role;
            user.save((err) => {
              if (err) {
                res
                  .status(400)
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("200").json({ message: "Update succssful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin." });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({ message: "Role is not Admin" });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present." });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  await User.findByPk(userId)
    .then((user) => user.removeHook())
    .then((user) =>
      res.status(204).json({ message: "User successfully deleted." })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
