const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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

exports.searchBook = async bookName => {
  const bookCollection = await db().collection("Books");
  //const books = await bookCollection.find({}).toArray();
  const books = await bookCollection.find({ title: { $regex: bookName, $options: "i" } }).toArray();

  if (books == null) console.log("Không tìm thấy");
  else {
    console.log("Tìm thấy");
  }
  return books;
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

exports.getCategoryNameById = async id => {
  const categoriesCollection = await db().collection("Category");
  const result = categoriesCollection.findOne({ _id: ObjectID(id) });
  return result;
};

exports.getAllCategory = async () => {
  const categoriesCollection = await db().collection("Category");
  const allCategories = await categoriesCollection.find({}).toArray();
  return allCategories;
};

// list by categoryID
exports.listByCategory = async categoryId => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({ category_id: categoryId }).toArray();

  return books;
};

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
  let status;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(id) });
  if (existsBook === null || existsBook === undefined) {
    console.log(`Can't find book with ID ${id}`);
    success = false;
  } else {
    if (existsBook.is_deleted === false) {
      status = true;
      await bookCollection.updateOne({ _id: ObjectID(id) }, { $set: { is_deleted: true } });
    } else {
      status = false;
      await bookCollection.updateOne({ _id: ObjectID(id) }, { $set: { is_deleted: false } });
    }
    success = true;
  }
  return { success, status };
};
// edit book
exports.editBook = async bookObj => {
  const bookCollection = await db().collection("Books");
  let success = true;
  let existsBook = await bookCollection.findOne({ _id: ObjectID(bookObj.id) });
  const tokens = existsBook.image_link.split("/");
  const imageName = tokens[tokens.length - 1];
  const imageId = imageName.split(".")[0];
  await cloudinary.uploader.destroy(imageId, (err, result) => {
    console.log(err, result);
  });
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
  let imagelink;
  await cloudinary.uploader.upload(oldPath, (err, result) => {
    if (err) {
      imagelink = null;
    } else {
      imagelink = result.url;
    }
  });
  return imagelink;
};
exports.paging = async (page, pageLimit, category, searchText) => {
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  let totalBook;
  let books;
  if (category) {
    books = await bookCollection
      .find({ category_id: category })
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
    totalBook = books.length;
  } else if (searchText) {
    books = await bookCollection.find({ title: { $regex: searchText, $options: "i" } }).toArray();
    totalBook = books.length;
  } else {
    books = await bookCollection
      .find({})
      .skip(limit * currentPage - limit)
      .limit(limit)
      .toArray();
    totalBook = await bookCollection.count();
  }
  return { books, totalBook };
};

exports.saveAvatar = async file => {
  const oldPath = file.avatarImageInput.path;
  const imageName = file.avatarImageInput.path.split(path.sep).pop();

  const imageType = file.avatarImageInput.name.split(".").pop();

  const imagePath = path.join(".", "public", "images", "userImage", `${imageName}.${imageType}`);

  let rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);

  return `${imageName}.${imageType}`;
};


exports.editAvatar = async userObject => {
  const userCollection = await db().collection("registeredUser");
  const id = userObject.id;
  let success = false;

  let existsUser = await userCollection.findOne({ _id: ObjectID(id) });
  if (existsUser === null || existsUser === undefined) {
    console.log(`Cant find user with id ${id}`);
    success = false;
  } else {
    userCollection.updateOne(
      { _id: ObjectID(id) },
      {
        $set: {
          avatar_image: userObject.avatar_image,
        },
      }
    );
    success = true;
  }
  return success;
};