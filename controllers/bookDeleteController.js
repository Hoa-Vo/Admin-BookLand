const booksModel = require("../models/booksModel");
//const querystring = require('querystring');


exports.deleteBook = async (req,res,next) => 
{
    // parse book ID from request
    const idToDelete = req.query.id;
    console.log(`Received key-value ${idToDelete}`);
    let result = await booksModel.deleteBook(idToDelete); 

    if(result === true)
    {
        res.status(202).end();
    }
    else{
        res.status(204).end();
    }


    

    // call delete from model and send back response
    
}