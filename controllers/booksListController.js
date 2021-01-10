const booksModel = require("../models/booksModel.js");
const accountModel=require("../models/accountModel.js");
exports.listing = async (req, res, next) => {
  // get req category
  const receivedCategoryID = req.query.categoryID;
  let currentCategory = null;

  let userToShow=null;
  if(req.user)
  {
    userToShow=accountModel.getUserById(req.user._id);
  }

  let booksToShow;
  console.log(`Received with query: ${receivedCategoryID}`);

  if (receivedCategoryID === "all") {
    res.redirect("/bookslist/");
    return;
  }
  if (receivedCategoryID != undefined) {
    // Apply filter

    booksToShow = await booksModel.listByCategory(receivedCategoryID);
    currentCategory = await booksModel.getCategoryNameById(receivedCategoryID);
    currentCategory = currentCategory.name;
  } else {
    currentCategory = "Tất cả";
    booksToShow = await booksModel.list();
  }
  const categoriesListToShowInMenu = await booksModel.getAllCategory();
  // Pass data to view to display list of books
  res.render("booksPage/bookslist", {
    currentCategoryId: receivedCategoryID,
    books: booksToShow,
    categories: categoriesListToShowInMenu,
    currentCategory: currentCategory,
    userToShow:userToShow,
  });
  //res.render("booksPage/bookslist"
};
exports.paging = async (req, res, next) => {
  const data = await booksModel.paging(
    req.query.page,
    req.query.pagelimit,
    req.query.category,
    req.query.searchText
  );
  res.send({ data });
};
