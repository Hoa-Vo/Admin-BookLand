

const accountModel = require("../models/accountModel");

exports.renderCartPage = async (req, res, next) => {
  let userToShow = null;
  if (req.user) {
    console.log(`req.user: ${req.user._id}`);
    isSignedIn = true;
    userToShow = await accountModel.getUserById(req.user._id);
    console.log(userToShow);
  }
  res.render("./cartPage/cart", { userToShow: userToShow });
};
