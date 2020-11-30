const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController=require("../controllers/createNewBookController");

// Get booklist page
router.get("/", booksListController.listing);
router.get("/:id", booksDetailController.listing);
router.get("/createNew",createNewBookController.renderCreateNewBookPage);
router.get("/delete/:id",booksListController.listing);
router.get("/edit",booksListController.listing);
module.exports = router;
