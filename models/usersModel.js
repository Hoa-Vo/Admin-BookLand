const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const { create } = require("hbs");

exports.getUserById = async id => {
    const userCollection = await db().collection("registeredUser");
    const user = await userCollection.findOne({ _id: ObjectID(id) });
    const adminCollection = await db().collection("adminAccount");
    const admin =await adminCollection.findOne({_id:ObjectID(id)});
    if(admin==null || admin ==undefined)
        return user;
    else if(user==null||admin==undefined)
        return admin;
};
  
// get user by username
exports.getUserByUsername = async name => {
const userCollection = await db().collection("registeredUser");
const user = await userCollection.findOne({ name: name });
return user;
};
// list all user
exports.listAll = async () => {
const userCollection = await db().collection("registeredUser");
const users = await userCollection.find({}).toArray();
return users;
};
exports.fetchAllUsers=async ()=>
{
    const userCollection= await db().collection("registeredUser");
    const usersList=await userCollection.find({}).toArray();
    return usersList;
}

exports.getUsersCount=async (category,searchText)=>
{
    let userCollection= await db().collection("registeredUser");
    if(category=="admin"){
        userCollection=await db().collection("adminAccount");
    }
    else if(category=="users"){
        userCollection=await db().collection("registeredUser");
    }
    let count=0;
    if(searchText!=null && searchText!=undefined && searchText!="")
        count=await userCollection.find({ name: { $regex: searchText, $options: "i" }}).count();
    else
        count=await userCollection.find({}).count();
    if(count==undefined)count=0;
    return count;
}

exports.fetchUsersAndPaging=async (category,searchText,currentPage, pageLimit)=>
{
    const page =parseInt(currentPage);
    const limit=parseInt(pageLimit);
    let userCollection=await db().collection("registeredUser");
    if(category=="users"){
        userCollection= await db().collection("registeredUser");
    }
    else if(category=="admin"){
        userCollection= await db().collection("adminAccount");
    }
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


exports.lockUserAccount=async (userID, accountID) =>
{
    const accountCollection =await db().collection("registeredUser");
    let success = true;
    let existsAccount = await accountCollection.findOne({ _id: ObjectID(userID) });

    if (existsAccount === null || existsAccount === undefined)// nếu là id của account admin
    {
        try{
            const adminAccountCollection =await db().collection("adminAccount");
            existsAccount = await adminAccountCollection.findOne({ _id: ObjectID(userID) });
            if (existsAccount === null || existsAccount === undefined)
            {
                console.log(`Can't find users with ID ${userID}`);
                success=false;
            }
            else if(existsAccount.super_admin==true)// chặn khóa tài khoản super admin
            {
                console.log("super-admin");

                success=false;
            }
            else if (existsAccount.isLocked==false) {
                await adminAccountCollection.updateOne({ _id: ObjectID(userID) }, { $set: { isLocked: true } });
                console.log("islocked");

                success=true;
            } 
        }
        catch(ex)
        {
            console.log(ex);
        }
    }
    else if (existsAccount.isLocked &&success) {
        await accountCollection.updateOne({ _id: ObjectID(userID) }, { $set: { isLocked: true } });
        success=true;
    } 
    return { success };
}

exports.unlockUserAccount=async (userID, accountID) =>
{
    const accountCollection =await db().collection("registeredUser");
    let success = true;
    let existsAccount = await accountCollection.findOne({ _id: ObjectID(userID) });
    if (existsAccount === null || existsAccount === undefined)// nếu đây là id của account admin
    {
        try{
            const adminAccountCollection =await db().collection("adminAccount");
            existsAccount = await adminAccountCollection.findOne({ _id: ObjectID(userID) });
            if (existsAccount === null || existsAccount === undefined)
            {
                console.log(`Can't find users with ID ${userID}`);
                success=false;
            }
            else if(existsAccount.super_admin==true)// chặn khi đây là tài khoản super admin
            {
                console.log("super -admin");
                success=false;
            }
            else if (existsAccount.isLocked==true) {
                await adminAccountCollection.updateOne({ _id: ObjectID(userID) }, { $set: { isLocked: true } });
                console.log("islocked");
                success=true;
            } 
        }
        catch(ex)
        {
            console.log(ex);
        }
    }
    else if (existsAccount.isLocked === false) {
        await accountCollection.updateOne({ _id: ObjectID(userID) }, { $set: { isLocked: false } });
        success=true;
    } 
    return { success };
}