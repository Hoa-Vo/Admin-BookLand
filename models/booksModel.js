const { db } = require("../database/db");
const { ObjectID } = require("mongodb");

exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();

  console.log(books);
  return books;
};
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};
