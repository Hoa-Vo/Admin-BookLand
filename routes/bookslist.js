const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController = require("../controllers/createNewBookController");
const bookDeleteController = require("../controllers/bookDeleteController");
const editSpecifiedBookController = require("../controllers/editSpecifiedBookController");
const searchSpecifiedBookController= require("../controllers/searchSpecifiedBookController");

router.get("/", booksListController.listing);
router.delete("/", bookDeleteController.deleteBook);
router.get("/search", searchSpecifiedBookController.get);
router.get("/createNew", createNewBookController.renderCreateNewBookPage);
router.get("/page",booksListController.paging);
router.post("/createNew", createNewBookController.addBook);
router.post("/edit", editSpecifiedBookController.editBook);
router.get("/edit/:id", editSpecifiedBookController.renderEditSpecifiedPage);
router.get("/:id", booksDetailController.get);
module.exports = router;
