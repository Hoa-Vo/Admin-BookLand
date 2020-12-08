const formidable = require("formidable");
const booksModel = require("../models/booksModel.js");
exports.renderCreateNewBookPage = (req, res, next) => {
  console.log("reach before render");
  res.render("./createNewBook/createNewBookPage");
};

exports.addBook = async (req, res, next) => {
  const form = formidable.IncomingForm();
  await form.parse(req, function (err, fields, files) {
    if (err || files.bookImage.type !== "image/jpeg") {
      res.send(204);
    } else {
      booksModel
        .saveImage(files)
        .then(imageName => {
          let bookObj = {
            title: fields.titleInput,
            basePrice: fields.basePriceInput,
            author: fields.authorInput,
            publisher: fields.publisherInput,
            image_link: imageName,
          };
          return bookObj;
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
