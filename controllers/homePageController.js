const { json } = require("express");
const accountModel = require("../models/accountModel");
exports.renderHomePage = async (req, res, next) => {
  let isSignedIn = false;
  let userToShow = null;
  console.log("tai khoan dang nhap: "+req.user);
  if (req.user) {
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
  }
  
  // render based on logged in or not
  res.render("./homepage/index", {
    isSignedIn: isSignedIn,
    userToShow: userToShow,
  });
};