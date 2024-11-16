const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied.");

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({message: "Not Authorized"})
      } else {
        if (decodedToken.role !== "Admin") {
          return res.status(401).json({message: "Not Authorized"})
        } else {
          next()
        }
      }
    })
  } else {
    return res.status(401).json({ message: "Not Authorized, token not available." });
  }
}

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not Authorized" });
      } else {
        if (decodedToken.role !== "Member") {
          return res.status(401).json({ message: "Not Authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not Authorized, token not available." });
  }
};