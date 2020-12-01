const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController = require("../controllers/createNewBookController");
const bookDeleteController = require("../controllers/bookDeleteController");

// Get booklist page
router.get("/", booksListController.listing);

router.get("/createNew", createNewBookController.renderCreateNewBookPage);

router.get("/:id", booksDetailController.listing);
router.delete("/", bookDeleteController.deleteBook);

router.post("/createNew", createNewBookController.addBook);
module.exports = router;
