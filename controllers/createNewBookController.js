const booksModel = require("../models/booksModel");
var bodyParser = require("body-parser");

exports.renderCreateNewBookPage = (req, res, next) => {
  console.log("reach before render");
  res.render("./createNewBook/createNewBookPage");
};

exports.addBook = async (req, res, next) => {
  console.log(req.body);
  let bookObj = {
    title: req.body.titleInput,
    basePrice: req.body.basePriceInput,
    author: req.body.authorInput,
    publisher: req.body.publisherInput,
    image: "none",
  };

  let result = await booksModel.addBook(bookObj);
  console.log(`result is${result}`);
  if (result === true) {
    res.status(202).redirect(301, "/bookslist");
  } else {
    res.status(204).end();
  }
};
