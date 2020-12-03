const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
require("dotenv/config");
exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  return books;
};
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};

exports.addBook = async bookObj => {
  const bookCollection = await db().collection("Books");
  let success = true;
  let bookAdded = await bookCollection.insertOne(bookObj);

  if (bookAdded === null || bookAdded === undefined) {
    success = false;
  }

  return success;
};

exports.deleteBook = async id => {
  const bookCollection = await db().collection("Books");
  let success = false;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(id) });

  if (existsBook === null || existsBook === undefined) {
    console.log(`Can't find book with ID ${id}`);
    success = false;
  } else {
    await bookCollection.deleteOne({ _id: ObjectID(id) });
    success = true;
  }
  return success;
};

exports.editBook = async bookObj => {
  console.log("book model ne");
  console.log(bookObj);
  const bookCollection = await db().collection("Books");
  let success = true;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(bookObj.id) });

  if (existsBook === null || existsBook === undefined) {
    console.log(`Can't find book with ID ${id}`);
    success = false;
  } else {
    bookCollection.updateOne(
      { _id: ObjectID(bookObj.id) },
      {
        $set: {
          title: bookObj.title,
          basePrice: bookObj.basePrice,
          author: bookObj.author,
          publisher: bookObj.publisher,
        },
      }
    );
    success = true;
  }
  return success;
};
exports.saveImage = async file => {
  const oldPath = file.bookImage.path;
  const imageName = file.bookImage.path.split('\\').pop();
  const imageType = file.bookImage.name.split('.').pop();
  const imagePath = `./public/images/booksImage/${imageName}.${imageType}`;
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
  return imageName;
}