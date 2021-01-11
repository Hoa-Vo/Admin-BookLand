const booksModel = require("../models/booksModel.js");
const accountModel = require("../models/accountModel");

exports.get = async (req, res, next) => {
  const bookName = req.query.bookName;
  const books = await booksModel.searchBook(bookName);
  const categoriesListToShowInMenu = await booksModel.getAllCategory();
  // Pass data to view to display list of books

  let userToShow=null;
  if(req.user)
  {
    userToShow=accountModel.getUserById(req.user._id);
  }

  res.render("booksPage/bookslist", {
    books,
    bookName,
    categories: categoriesListToShowInMenu,
    currentCategory: "Tất cả",
    userToShow:userToShow,
  });
};
