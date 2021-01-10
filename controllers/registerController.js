const accountModel = require("../models/accountModel");
const accountServices = require("../services/accountServices");

exports.renderRegisterPage = (req, res, next) => {
  res.render("./login-register/register");
};

exports.registerNewUser = async (req, res, next) => {
  await accountServices.registerNewuser(req.body.username, req.body.password, req.body.email);
  res.redirect("/login");
};
