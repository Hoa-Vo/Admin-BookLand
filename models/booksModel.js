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

exports.addBook = async bookObj => 
{
    const bookCollection = await db().collection("Books");
    let success = true; 
    let bookAdded =  await bookCollection.insertOne(bookObj); 

    

    if(bookAdded === null || bookAdded === undefined)
    {
      success = false; 
    }


     return success; 
}

exports.deleteBook = async id => 
{
  const bookCollection = await db().collection("Books");
  let success = false; 
  let existsBook = await bookCollection.findOne({_id: ObjectID(id)});
  
  //console.log(existsBook);

  if(existsBook === null || existsBook === undefined)
  {
      console.log(`Can't find book with ID ${id}`);
      success = false; 
  }
  else{
     await bookCollection.deleteOne({_id: ObjectID(id)});
     success = true; 
  }
  return success; 
}