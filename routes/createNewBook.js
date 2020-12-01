const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController=require("../controllers/createNewBookController");

// Get booklist page
//router.get("/",createNewBookController.renderCreateNewBookPage);

router.put("/",createNewBookController.addBook);

module.exports = router;