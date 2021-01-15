const passport = require("../middleware/passport/index"); 

exports.renderLoginPage = (req, res, next) => {
  let errorMessage = req.flash('error')[0];

  console.log(errorMessage);
  res.render("./login-register/login", {error: errorMessage});
};

exports.tryLogin = (req,res,next) => {
  console.log("gone to try login");
  passport.authenticate('local', {successRedirect: "/",failureRedirect: "/login",failureFlash: true});
}
