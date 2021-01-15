const { db } = require("../database/db");
const { ObjectID } = require("mongodb");



exports.checkExistsCategoryID = async (categoryId) => 
{
    const categoryCollection = await db().collection("Category"); 
    
    // if exists category
    let exists = await categoryCollection.findOne({_id: ObjectID(categoryId)}); 

    if(exists == null || exists == undefined)
    {
        return false; 
    }
    return true;
}

exports.checkExistCategoryName = async (categoryName) => 
{
    const categoriesCollection = await db().collection("Category"); 
    const found = await categoriesCollection.findOne({name: categoryName}); 

    if(found!= null && found!= undefined)
    {
        return true;
    }
    return false;
}

exports.addNewCategory = async (categoryName) => 
{
    const categoriesCollection = await db().collection("Category"); 
    const newInserted = await categoriesCollection.insertOne({
        name: categoryName
    });

    return newInserted.insertedId;
}

exports.getAllCategory = async () => {
    const categoriesCollection = await db().collection("Category");
    const bookCollection = await db().collection("Books");
    const allCategories = await categoriesCollection.find({}).toArray();

    for (i = 0; i < allCategories.length; i++) {
        let currentID = allCategories[i]._id.toString();
        allCategories[i].count = await bookCollection
          .find({ category_id: currentID, is_deleted: false })
          .count();
      }
    return allCategories;
};