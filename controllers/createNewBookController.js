const formidable = require("formidable");
const booksModel = require("../models/booksModel.js");
const accountModel = require("../models/accountModel");
exports.renderCreateNewBookPage = (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    userToShow=accountModel.getUserById(req.user._id);
  }
  res.render("./createNewBook/createNewBookPage",{userToShow:userToShow});
};

exports.addBook = async (req, res, next) => {
  const form = formidable.IncomingForm();
  await form.parse(req, function (err, fields, files) {
    if (err || files.bookImage.type.split("/")[0] !== "image") {
      res.send(204);
    } else {
      booksModel
        .saveImage(files)
        .then(imagelink => {
          if (imagelink) {
            let bookObj = {
              title: fields.titleInput,
              basePrice: fields.basePriceInput,
              author: fields.authorInput,
              publisher: fields.publisherInput,
              image_link: imagelink,
              is_deleted: false,
            };
            return bookObj;
          } else {
            res.send(204);
          }
        })
        .then(bookObj => {
          booksModel.addBook(bookObj).then(result => {
            if (result === true) {
              res.status(202).send({
                imageName: bookObj.image_link,
              });
            } else {
              res.send(204).end();
            }
          });
        });
    }
  });
};
