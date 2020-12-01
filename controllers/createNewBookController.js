var bodyParser = require('body-parser');

exports.renderCreateNewBookPage = (req, res, next) => {
  console.log("reach before render");
  res.render("./createNewBook/createNewBookPage");
};

exports.addBook = async (req, res, next) => {
  console.log(req.body);
  let bookObj = {
    "title": req.body.title, 
  }

  
  
  let result = await booksModel.addBook(req.body);
  console.log(`result is${result}`);
  if (result === true) {
    res.status(201).end();
  } else {
    res.status(204).end();
  }
};
