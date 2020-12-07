const booksListModel = require("../models/booksModel.js");

exports.listing = async (req, res, next) => {
  // get req category 
  const receivedCategoryID = req.query.categoryID; 

  let booksToShow;
  console.log(`Received with query: ${receivedCategoryID}`); 
  if(receivedCategoryID != undefined)
  {
    // Apply filter
    
    booksToShow = await booksListModel.listByCategory(receivedCategoryID); 
  }
  else{
    booksToShow = await booksListModel.list();
  }

  

  
  const categoriesToShow = await booksListModel.getAllCategory(); 
  // Pass data to view to display list of books
  res.render("booksPage/bookslist", { books: booksToShow, categories: categoriesToShow});
  //res.render("booksPage/bookslist"
};
