const express = require("express");
const router = express.Router();
const booksListController = require("../controllers/booksListController");
const booksDetailController = require("../controllers/booksDetailController");
const createNewBookController = require("../controllers/createNewBookController");
const bookDeleteController = require("../controllers/bookDeleteController");
const editSpecifiedBookController = require("../controllers/editSpecifiedBookController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
// Get booklist page
router.get("/", booksListController.listing);
router.delete("/", bookDeleteController.deleteBook);
router.get("/createNew", createNewBookController.renderCreateNewBookPage);
router.post("/createNew", upload.single("book-image"), createNewBookController.addBook);
router.post("/edit", editSpecifiedBookController.editBook);
router.get("/edit/:id", editSpecifiedBookController.renderEditSpecifiedPage);
router.get("/:id", booksDetailController.listing);
module.exports = router;
