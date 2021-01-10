const accountModel = require("../models/accountModel");

exports.renderCheckOutPage = async (req, res, next) => {
  userToShow = await accountModel.getUserById(req.user._id);
  res.render("checkoutPage/checkout", { userToShow: userToShow });
};
