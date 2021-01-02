const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const { create } = require("hbs");

exports.fetchAllUsers=async ()=>
{
    const userCollection= await db().collection("registeredUser");
    const usersList=await userCollection.find({}).toArray();
    return usersList;
}

exports.getUsersCount=async (searchText)=>
{
    const userCollection= await db().collection("registeredUser");
    let count=0;
    if(searchText!=null && searchText!=undefined && searchText!="")
        count=await userCollection.find({ name: { $regex: searchText, $options: "i" }}).count();
    else
        count=await userCollection.find({}).count();
    if(count==undefined)count=0;
    return count;
}

exports.fetchUsersAndPaging=async (searchText,currentPage, pageLimit)=>
{
    const page =parseInt(currentPage);
    const limit=parseInt(pageLimit);
    const userCollection= await db().collection("registeredUser");
    let usersList;
    //createindex();
    if(searchText!=null && searchText!=undefined && searchText!="")
    {
        usersList=await userCollection
        .find({ name: { $regex: searchText, $options: "i" }})
        .skip(limit * page - limit)
        .limit(limit)
        .toArray();
    }
    else{
        usersList=await userCollection.find({})
        .skip(limit * page - limit)
        .limit(limit)
        .toArray();
    }
    return usersList;
}