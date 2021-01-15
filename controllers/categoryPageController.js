const accountModel = require("../models/accountModel"); 
const categoryModel = require ("../models/categoryModel"); 

exports.render = async (req,res,next) => 
{
    let userToShow = null;
    if(req.user)
    {
        userToShow= await accountModel.getUserById(req.user._id);

        const categories = await categoryModel.getAllCategory(); 
        

        res.render("category/CategoryPage", {userToShow: userToShow, isSignedIn : true, categories: categories}); 
    }
    else{
        res.redirect("/login");
    }
}