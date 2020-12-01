const booksModel = require("../models/booksModel");

exports.renderEditSpecifiedPage = async (req, res, next) => {
  // Get books from model
  const book = await booksModel.get(req.params.id);
  console.log("get book from db:");
  console.dir(book.publisher);
  // Pass data to view to display list of books
  res.render("./editBook/editSpecifiedBookPage", {
    id: book._id,
    title: book.title,
    basePrice: book.basePrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
  });
};

exports.editBook = async (req, res, next) => {
  console.log("day ne");
  let bookObj = {
    id: req.body.idInput,
    title: req.body.titleInput,
    basePrice: req.body.basePriceInput,
    author: req.body.authorInput,
    publisher: req.body.publisherInput,
    image: "none",
  };
  console.log(bookObj);
  let result = await booksModel.editBook(bookObj);
  console.log(`Edit result is ${result}`);
  if (result === true) {
    // Get books from model
    res.status(202).redirect(301, "/bookslist");
  } else {
    res.status(204).end();
  }
};
