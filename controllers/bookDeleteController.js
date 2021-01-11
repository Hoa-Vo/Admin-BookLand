const booksModel = require("../models/booksModel.js");
const accountModel = require("../models/accountModel");
//const querystring = require('querystring');

exports.deleteBook = async (req, res, next) => {
  // parse book ID from request
  const idToDelete = req.query.id;
  let result = await booksModel.deleteBook(idToDelete);

  let userToShow=null;
  if(req.user)
  {
    userToShow=accountModel.getUserById(req.user._id);
  }


  if (result.success === true) {
    res.status(202).send(result.status);
  } else {
    res.status(204).end();
  }
  // call delete from model and send back response
};
