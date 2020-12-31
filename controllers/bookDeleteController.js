const booksModel = require("../models/booksModel.js");
//const querystring = require('querystring');

exports.deleteBook = async (req, res, next) => {
  // parse book ID from request
  const idToDelete = req.query.id;
  let result = await booksModel.deleteBook(idToDelete);
  if (result.success === true) {
    res.status(202).send(result.status);
  } else {
    res.status(204).end();
  }
  // call delete from model and send back response
};
