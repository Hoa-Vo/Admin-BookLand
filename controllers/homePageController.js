const { json } = require("express");
const accountModel = require("../models/accountModel");
const booksModel=require("../models/booksModel");
exports.renderHomePage = async (req, res, next) => {
  let isSignedIn = false;
  let userToShow = null;
  console.log("tai khoan dang nhap: "+req.user);
  if (req.user) {
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
  }

  let homePageList=await booksModel.listForHomePage();
  var booksList=[];
  for(var i=0;i<3;i++)
  {
    booksList.push({col:[]});
    for (var j=0;j<2;j++)
    {
      booksList[i].col.push(homePageList[2*i+j]);
    }
  }
  // render based on logged in or not
  res.render("./homepage/index", {
    isSignedIn: isSignedIn,
    userToShow: userToShow,
    booksToShow:booksList,
  });
};

