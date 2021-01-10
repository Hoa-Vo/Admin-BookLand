const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bookModel = require("./booksModel");

exports.getUserCart = async id => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: ObjectID(id) });
  if (userCart) {
    const books = userCart.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  } else {
    await cartCollection.insertOne({
      userId: ObjectID(id),
      books: [{}],
    });
    const userCart = await cartCollection.findOne({ userId: ObjectID(id) });
    const books = userCart.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  }
};

exports.addBookToUserCart = async (userId, bookId) => {
  const cartCollection = await db().collection("UserCart");
  const userCart = await cartCollection.findOne({ userId: ObjectID(userId) });
  const isExistInCart = userCart.books.find(element => element.id === ObjectID(bookId));
  if (isExistInCart) {
    await cartCollection.update(
      { userId: ObjectID(userId), "books.id": ObjectID(bookId) },
      { $inc: { "books.$.quantity": 1 } }
    );
  } else {
    await cartCollection.update(
      { userId: ObjectID(userId) },
      { $push: { books: { id: ObjectID(bookId), quantity: 1 } } }
    );
  }
  const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.delBookFromUserCart = async (userId, bookId) => {
  const cartCollection = await db().collection("UserCart");
  await cartCollection.update(
    { userId: ObjectID(userId) },
    { $pull: { books: { id: ObjectID(bookId) } } }
  );
  const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
  const books = userCartAfterUpdate.books;
  const booksInfo = await bookModel.getCartInfo(books);
  return booksInfo;
};
exports.updateBookFromUserCart = async (userId, bookId, quantity) => {
  if (quantity === "0") {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update(
      { userId: ObjectID(userId) },
      { $pull: { books: { id: ObjectID(bookId) } } }
    );
    const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
    const books = userCartAfterUpdate.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  } else {
    const cartCollection = await db().collection("UserCart");
    await cartCollection.update(
      { userId: ObjectID(userId), "books.id": ObjectID(bookId) },
      { $set: { "books.$.quantity": parseInt(quantity) } }
    );
    const userCartAfterUpdate = await cartCollection.findOne({ userId: ObjectID(userId) });
    const books = userCartAfterUpdate.books;
    const booksInfo = await bookModel.getCartInfo(books);
    return booksInfo;
  }
};
