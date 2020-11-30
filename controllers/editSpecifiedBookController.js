
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