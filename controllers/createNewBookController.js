const booksModel = require("../models/booksModel.js");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.renderCreateNewBookPage = (req, res, next) => {
  console.log("reach before render");
  res.render("./createNewBook/createNewBookPage");
};

exports.addBook = async (req, res, next) => {
  let imageBuffer = new Buffer.from(req.file.buffer, "base64");
  let imageLink = uuidv4().toString();
  fs.writeFile(`./public/images/booksImage/${imageLink}.jpg`, imageBuffer, function (err) {
    if (err) res.status(204).end();
  });
  let bookObj = {
    title: req.body.titleInput,
    basePrice: req.body.basePriceInput,
    author: req.body.authorInput,
    publisher: req.body.publisherInput,
    image_link: imageLink,
  };
  let result = await booksModel.addBook(bookObj);
  console.log(`result is${result}`);
  if (result === true) {
    res.status(202).redirect(301, "/bookslist");
  } else {
    res.status(204).end();
  }
};
