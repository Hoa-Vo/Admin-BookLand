const accountModel = require("../models/accountModel");
const accountServices = require("../services/accountServices");

exports.renderRegisterPage = (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    const id=req.user._id;
    const userToShow=accountModel.getUserById(id);
    res.render("./login-register/register", {userToShow:userToShow});
  }
  else 
  {
    res.redirect("./login");
  }
};

exports.registerNewUser = async (req, res, next) => {
  if(req.user)
  {
    const adminID=req.user._id;
    const registered=await accountServices.registerNewuser(req.user._id,req.body.username, req.body.password, req.body.email);
    console.log(registered.success);
  }
  res.redirect("/login");
};
