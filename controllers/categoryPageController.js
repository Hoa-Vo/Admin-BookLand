const accountModel = require("../models/accountModel"); 
const categoryModel = require ("../models/categoryModel"); 
const categoryServices = require("../services/categoryServices"); 

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

exports.addCategory  = async (req,res,next) => 
{
    console.log(req.body);
    const newCategoryName = req.body.newCategoryName; 
    let result = await categoryServices.addNewCategory(newCategoryName);

    if(result)
    {
        const categories = await categoryModel.getAllCategory(); 
        res.status(202).send(true);
    }
    else{
        res.status(202).send(false);
    }
    
}