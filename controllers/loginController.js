const passport = require("../middleware/passport/index"); 

exports.renderLoginPage = (req, res, next) => {
  res.render("./login-register/login");
};

exports.tryLogin = (req,res,next) => {
  console.log("gone to try login");
  passport.authenticate('local', {successRedirect: "/",failureRedirect: "/login",failureFlash: true});
}
