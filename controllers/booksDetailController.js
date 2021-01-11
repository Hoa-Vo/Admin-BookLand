const booksModel = require("../models/booksModel.js");
const accountModel = require("../models/accountModel");
exports.get = async (req, res, next) => {
  // Get books from model
  const book = await booksModel.get(req.params.id);

  let userToShow=null;
  if(req.user)
  {
    userToShow=accountModel.getUserById(req.user._id);
  }
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", {
    title: book.title,
    basePrice: book.basePrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
    userToShow:userToShow,
  });

};
