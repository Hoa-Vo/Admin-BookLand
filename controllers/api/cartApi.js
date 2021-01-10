const bookModel = require("../../models/booksModel");
const cartModel = require("../../models/cartModel");

exports.getCartInfo = async (req, res, next) => {
  if (req.query.cart === "" || req.query.cart === undefined) {
    res.send("empty");
  } else {
    const books = await bookModel.getCartInfo(req.query.cart);
    res.json(books);
  }
};
exports.getUserCartInfo = async (req, res, next) => {
  const cartInfo = await cartModel.getUserCart(req.query.userID);
  if (cartInfo.length>0) {
    res.json(cartInfo);
  }
  else{
    res.send("empty");
  }
};
exports.addBookToCart = async (req, res, next) => {
  const cartInfo = await cartModel.addBookToUserCart(req.query.userID, req.query.bookID);
  res.json(cartInfo);
};
exports.delBookFromCart = async (req, res, next) => {
  const cartInfo = await cartModel.delBookFromUserCart(req.query.userID, req.query.bookID);
  if (cartInfo.length>0) {
    res.json(cartInfo);
  }
  else{
    res.send("empty");
  }
};
exports.updateBookFromCart = async (req, res, next) => {
  const cartInfo = await cartModel.updateBookFromUserCart(
    req.query.userID,
    req.query.bookID,
    req.query.quantity
  );
  if (cartInfo.length>0) {
    res.json(cartInfo);
  }
  else{
    res.send("empty");
  }
};
