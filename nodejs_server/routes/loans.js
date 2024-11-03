const express = require("express");
const controller = require("../controllers/loan");
const auth = require("../middleware/auth");

const router = express.Router();

// get all loans
router.get("/", controller.getLoans);

// get a specific loan
router.get("/:id", controller.getLoan);

// create a new loan
router.post("/", controller.createLoan);

// update a loan
router.put("/:id", controller.updateLoan);

// Delete a loan
router.delete("/:id", controller.deleteLoan);

module.exports = router;
