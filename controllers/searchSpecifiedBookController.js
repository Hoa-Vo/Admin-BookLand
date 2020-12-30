const booksModel = require("../models/booksModel.js");

exports.get = async (req, res, next) => {
  const bookName = req.query.bookName;
  const books = await booksModel.searchBook(bookName);
  const categoriesListToShowInMenu = await booksModel.getAllCategory();
  // Pass data to view to display list of books

  res.render("booksPage/bookslist", {
    books,
    bookName,
    categories: categoriesListToShowInMenu,
    currentCategory: "Tất cả",
  });
};
