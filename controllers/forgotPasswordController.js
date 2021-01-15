const accountModel = require("../models/accountModel");
exports.renderForgotPasswordPage = (req,res,next) => 
{
    let userToShow = null;
    console.log("Inside controller");
    res.render("./forgotPassword/forgotPassword", {userToShow: userToShow}); 
}


exports.renderEnterNewPasswordPage = (req,res,next) => 
{
    res.render("./forgotPassword/enterNewPassword");
}

exports.changePassword = async (req,res,next) =>
{
    //console.log(req.params);

    const idToChange = req.params.id; 
    console.log("id in change password: " + idToChange);
    await accountModel.changePassword(idToChange, req.body.newpassword);    
    res.send(202);
}