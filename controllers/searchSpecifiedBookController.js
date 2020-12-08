const booksListModel = require("../models/booksModel.js");


exports.get=async (req,res,next)=>{
    const bookName=req.query.bookName;
    console.log(bookName);
    const books = await booksListModel.searchBook(bookName);
    console.log(books);
    if (books==null) console.log("Không tìm thấy");
  else {
    console.log("Tìm thấy");
    console.log();
  }
  res.render("booksPage/bookslist", { books, bookName });
};
