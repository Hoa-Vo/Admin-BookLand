const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
require("dotenv/config");

// list all
exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  return books;
};

// get by specific ID
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};

exports.getCategoryNameById = async id => 
{
  const categoriesCollection = await db().collection("Category");
  const result = categoriesCollection.findOne({_id: ObjectID(id)});
  return result; 
}

exports.getAllCategory  = async() => 
{
  const categoriesCollection = await db().collection("Category");
  const allCategories = await categoriesCollection.find({}).toArray(); 
  return allCategories; 
}


// list by categoryID 
exports.listByCategory = async categoryId => 
{
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({category_id: categoryId}).toArray(); 
 
  return books; 
}

// add Book to database. addBook(bookObject)
exports.addBook = async bookObj => {
  const bookCollection = await db().collection("Books");
  let success = true;
  let bookAdded = await bookCollection.insertOne(bookObj);

  if (bookAdded === null || bookAdded === undefined) {
    success = false;
  }

  return success;
};
// Delete book with specific Id
exports.deleteBook = async id => {
  const bookCollection = await db().collection("Books");
  let success = false;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(id) });
  if (existsBook === null || existsBook === undefined) {
    console.log(`Can't find book with ID ${id}`);
    success = false;
  } else {
    const imagePath = `./public/images/booksImage/${existsBook.image_link}`;
    fs.unlinkSync(imagePath);
    try {
      fs.unlinkSync(`${process.env.USER_IMAGE_URI}${existsBook.image_link}`);
    } catch (err) {}
    await bookCollection.deleteOne({ _id: ObjectID(id) });
    success = true;
  }
  return success;
};
// edit book
exports.editBook = async bookObj => {
  const bookCollection = await db().collection("Books");
  let success = true;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(bookObj.id) });
  try {
    const imagePath = `./public/images/booksImage/${existsBook.image_link}`;
    fs.unlinkSync(imagePath);
    try {
      fs.unlinkSync(`${process.env.USER_IMAGE_URI}${existsBook.image_link}`);
    } catch (err) {}
  } catch (err) {}
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
          image_link: bookObj.image,
        },
      }
    );
    success = true;
  }
  return success;
};
// Save image
exports.saveImage = async file => {
  const oldPath = file.bookImage.path;
  const imageName = file.bookImage.path.split("\\").pop();
  const imageType = file.bookImage.name.split(".").pop();
  const imagePath = `./public/images/booksImage/${imageName}.${imageType}`;
  const userImagePath = `${process.env.USER_IMAGE_URI}${imageName}.${imageType}`;
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
  try {
    fs.writeFileSync(userImagePath, rawData);
  } catch (err) {}
  return `${imageName}.${imageType}`;
};
exports.paging = async (page,pageLimit)=>{
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const totalBook = await  bookCollection.count();
  const books = await bookCollection.find({}).skip(limit*currentPage-limit).limit(limit).toArray();
  return {books,totalBook};
}