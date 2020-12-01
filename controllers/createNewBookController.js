const booksModel = require("../models/booksModel")
var bodyParser = require('body-parser');

exports.renderCreateNewBookPage = (req, res, next) => {
  console.log("reach before render");
  res.render("./createNewBook/createNewBookPage");
};

exports.addBook = async (req, res, next) => {
  console.log(req.body);
  let bookObj = {
    "title": req.body.titleInput,
    "basePrice": req.body.basePriceInput,
    "author": req.body.authorInput,
    "publisher": req.body.publisherInput,
    "image": "none",  
  }

  
  
  let result = await booksModel.addBook(bookObj);
  console.log(`result is${result}`);
  if (result === true) {
    // Get books from model
    const books = await booksModel.list();
  // Pass data to view to display list of books
    res.render("booksPage/bookslist", { books });
  } else {
    res.status(204).end();
  }
};
