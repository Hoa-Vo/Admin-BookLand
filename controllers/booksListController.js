const booksListModel = require("../models/booksModel.js");

exports.listing = async (req, res, next) => {
  // Get books from model
  const books = await booksListModel.list();
  const categories = await booksListModel.getAllCategory(); 
  // Pass data to view to display list of books
  res.render("booksPage/bookslist", { books: books, categories: categories});
  //res.render("booksPage/bookslist");
};
