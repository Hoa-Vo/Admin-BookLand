const accountModel=require("../models/accountModel");
exports.get = async (req,res,next)=>{
    let userToShow=null;
    if(req.user)
    {
        userToShow=await accountModel.getUserById(req.user._id);
    }
    res.render("aboutUs");
}