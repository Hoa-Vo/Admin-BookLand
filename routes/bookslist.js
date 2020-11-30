const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController = require("../controllers/createNewBookController");

// Get booklist page
router.get("/", booksListController.listing);
router.get("/:id", booksDetailController.listing);
router.get("/createNew", createNewBookController.renderCreateNewBookPage);
router.delete("/", (req, res, next) => {
  console.log(req.query.id);
});
router.post("/", (req, res, next) => {
  console.log(req.body.id);
  console.log(req.body.type);
});
module.exports = router;
