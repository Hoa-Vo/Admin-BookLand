const formidable = require("formidable");
const booksModel = require("../models/booksModel.js");
exports.renderEditSpecifiedPage = async (req, res, next) => {
  // Get books from model
  const book = await booksModel.get(req.params.id);
  console.dir(book.publisher);
  // Pass data to view to display list of books
  res.render("./editBook/editSpecifiedBookPage", {
    id: book._id,
    title: book.title,
    basePrice: book.basePrice,
    publisher: book.publisher,
    author: book.author,
    imageLink: book.image_link,
  });
};

exports.editBook = async (req, res, next) => {
  const form = formidable.IncomingForm();
  await form.parse(req, function (err, fields, files) {
    if (err || files.bookImage.type !== "image/jpeg") {
      res.send(204, "file not image!!");
    } else {
      booksModel
        .saveImage(files)
        .then(imageName => {
          let bookObj = {
            id: fields.idInput,
            title: fields.titleInput,
            basePrice: fields.basePriceInput,
            author: fields.authorInput,
            publisher: fields.publisherInput,
            image: imageName,
          };
          return bookObj;
        })
        .then(bookObj => {
          booksModel.editBook(bookObj).then(result => {
            if (result === true) {
              res.status(202).redirect(301, "/bookslist");
            } else {
              res.send(204).end();
            }
          });
        });
    }
  });
};
