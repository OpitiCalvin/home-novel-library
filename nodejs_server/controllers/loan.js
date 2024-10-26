const Loan = require("../models/Loan");

// get all Loans
exports.getLoans = (req, res, next) => {
  Author.findAll()
    .then((loans) => {
      res.status(200).json({ loans: loans });
    })
    .catch((err) => console.log(err));
};

exports.getLoan = (req, res, next) => {};

exports.createLoan = (req, res, next) => {};

exports.updateLoan = (req, res, next) => {};

exports.deleteLoan = (req, res, next) => {};
