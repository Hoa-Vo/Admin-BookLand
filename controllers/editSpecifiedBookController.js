
const booksModel = require("../models/booksModel");

exports.renderEditSpecifiedPage =async (req, res, next) => {
    // Get books from model
    const book = await booksModel.get(req.params.id);
    // Pass data to view to display list of books
    res.render("./editBook/editSpecifiedBookPage", 
    {
        title: book.title,
        basePrice: book.basePrice,
        publisher: book.publisher,
        author: book.author,
        imageLink: book.image_link,
    });
};

exports.editBook = async (req,res,next) => 
{
    let bookObj = {
        "id" : req.body.idInput,
        "title": req.body.titleInput,
        "basePrice": req.body.basePriceInput,
        "author": req.body.authorInput,
        "publisher": req.body.publisherInput,
        "image": "none",  
    }
    let result = await booksModel.editBook(bookObj); 
    console.log(`Edit result is ${result}`); 
    if (result === true) {
        // Get books from model
        const books = await booksModel.list();
      // Pass data to view to display list of books
        res.render("booksPage/bookslist", { books });
      } else {
        res.status(204).end();
    }
}