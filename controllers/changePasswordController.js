const accountService = require("../services/accountServices"); 
const accountModel = require("../models/accountModel");

exports.renderChangePasswordPage = async(req,res,next) => 
{
    if(req.user)
    {
        const userToShow = await accountModel.getUserById(req.user._id);
        res.render("changePassword/changePasswordPage", {userToShow: userToShow}); 
    }
    else{
        res.redirect("/login");
    }
}

exports.checkAndChange = async (req,res,next) => 
{
    console.log(req.user)
    console.log("Receice old password:" + req.body.oldPassword);
    let idToChange = (req.user._id); 
    let checkPassword = await accountService.checkValidPassword(idToChange,req.body.oldPassword);  
    if(checkPassword)
    {
        // change password
        await accountModel.changePassword(idToChange, req.body.newPassword);    
        res.status(202).send(true);
    }
    else
    {
        res.status(202).send(false);
    }
    
}