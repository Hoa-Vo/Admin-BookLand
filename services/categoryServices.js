const categoryModel = require("../models/categoryModel");
const { db } = require("../database/db");
const { ObjectID } = require("mongodb");

exports.addNewCategory = async (categoryName) => 
{
    let exists = await categoryModel.checkExistCategoryName(categoryName); 

    if(!exists)
    {
        let newId  = await categoryModel.addNewCategory(categoryName); 
        return true; 
    }
    else{
        return false;
    }
}

exports.countBooks = async (categoryId) => 
{
    
}