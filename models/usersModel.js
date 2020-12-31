const { db } = require("../database/db");
const { ObjectID } = require("mongodb");

exports.fetchAllUsers=async ()=>
{
    const userCollection= await db().collection("registeredUser");
    const usersList=await userCollection.find({}).toArray();
    return usersList;
}

exports.getUsersCount=async ()=>
{
    const userCollection= await db().collection("registeredUser");
    const count=await userCollection.find({}).count();
    return count;
}

exports.fetchUsersAndPaging=async (currentPage, pageLimit)=>
{
    const page =parseInt(currentPage);
    const limit=parseInt(pageLimit);
    const userCollection= await db().collection("registeredUser");
    const usersList=await userCollection.find({})
    .skip(limit * page - limit)
    .limit(limit)
    .toArray();
    return usersList;
}