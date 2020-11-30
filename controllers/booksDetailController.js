const booksModel = require("../models/booksModel");

exports.listing = async (req, res, next) => {
  // Get books from model
  const book = await booksModel.get(req.params.id);
  // Pass data to view to book detail
  res.render("bookDetailsPage/booksDetail", {
    title: book.title,
    basePrice: book.basePrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
  });
};
