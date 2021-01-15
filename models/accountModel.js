const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { constants } = require("crypto");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage({}) });
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
require("dotenv/config");

// get user by ID
exports.getUserById = async id => {
  const adminAccountCollection = await db().collection("adminAccount");
  const user = await adminAccountCollection.findOne({ _id: ObjectID(id) });
  return user;
};

// get user by username
exports.getUserByUsername = async name => {
  const adminAccountCollection = await db().collection("adminAccount");
  const user = await adminAccountCollection.findOne({ name: name });
  return user;
};
// list all user
exports.listAll = async () => {
  const adminAccountCollection = await db().collection("adminAccount");
  const users = await adminAccountCollection.find({}).toArray();
  return users;
};

// try add new user
exports.addNewUser = async function (newUsername, plainNewPassword, newEmail) {
  const adminAccountCollection = await db().collection("adminAccount");
  const userpasswordCollecton = await db().collection("User-hashPassword");
  const newInserted = await adminAccountCollection.insertOne({
    name: newUsername,
    age: 10,
    email: newEmail,
    role:"admin",
    avatar_image: "https://res.cloudinary.com/hoavo1620/image/upload/v1610693807/q7lb7izyxsopfztremhg.jpg",
    isVerified: false,
    isLocked:false,
    super_admin:false,
  });
  console.log("New inserted user object");

  await bcrypt.hash(plainNewPassword, 3, (err, hashResult) => {
    if (err) {
      console.log(`Hash error: ${err}}`);
    }
    userpasswordCollecton.insertOne({ _id: newInserted.insertedId, password: hashResult });
  });
  return newInserted.insertedId;
};

// toogle verify (to true)

exports.changeVerifyStatus = async (id, newVerifyStatus) => {
  const adminAccountCollection = await db().collection("adminAccount");
  await adminAccountCollection.updateOne({ _id: ObjectID(id) }, { $set: { isVerified: newVerifyStatus } });
};

exports.isExistsUsername = async inputUsername => {
  const adminAccountCollection = await db().collection("adminAccount");
  let userDocument = await adminAccountCollection.findOne({ name: inputUsername });
  if (userDocument) {
    return true;
  } else {
    return false;
  }
};

exports.isExistsEmail = async inputEmail => {
  const adminAccountCollection = await db().collection("adminAccount");
  const adminAccountDocument = await adminAccountCollection.findOne({ email: inputEmail });
  if(adminAccountDocument)
  {
    return true; 
  }
  else{
    return false;
  }
  
}

exports.changePassword = async (userid, password) =>
{
  const userpasswordCollection = await db().collection("User-hashPassword");

   await bcrypt.hash(password, 3, (err,hashResult) => 
   {
     if (err) {
       console.log(`Hash error: ${err}}`);
       return false;
     }
     console.log(hashResult);
     userpasswordCollection.updateOne({_id: ObjectID(userid)}, 
                                     {$set: {password: hashResult}} );
   });
  // await userpasswordCollection.updateOne({_id: ObjectID(userid)} , {$set : {password : password}});

  // await userCollection.updateOne({ _id: ObjectID(id) }, { $set: { isVerified: newVerifyStatus } });
  return true;

  
}

exports.editAvatar = async userObject => {
  const userCollection = await db().collection("adminAccount");
  const id = userObject.id;
  let success = false;

  let existsUser = await userCollection.findOne({ _id: ObjectID(id) });
  if (existsUser === null || existsUser === undefined) {
    console.log(`Cant find user with id ${id}`);
    success = false;
  } else {
    userCollection.updateOne(
      { _id: ObjectID(id) },
      {
        $set: {
          avatar_image: userObject.avatar_image,
        },
      }
    );
    success = true;
  }
  return success;
};

exports.saveAvatar = async file => {
  const oldPath = file.avatarImageInput.path;
  let imagelink;
  await cloudinary.uploader.upload(oldPath, (err, result) => {
    if (err) {
      imagelink = null;
    } else {
      imagelink = result.url;
    }
  });
  return imagelink;
};


exports.changePassword = async (userid, password) =>
{
  const userpasswordCollection = await db().collection("User-hashPassword");

   await bcrypt.hash(password, 3, (err,hashResult) => 
   {
     if (err) {
       console.log(`Hash error: ${err}}`);
       return false;
     }
     console.log(hashResult);
     userpasswordCollection.updateOne({_id: ObjectID(userid)}, 
                                     {$set: {password: hashResult}} );
   });
  // await userpasswordCollection.updateOne({_id: ObjectID(userid)} , {$set : {password : password}});

  // await userCollection.updateOne({ _id: ObjectID(id) }, { $set: { isVerified: newVerifyStatus } });
  return true;

  
}

exports.changeAccountInfo = async accountObject => 
{
  const userCollection = await db().collection("adminAccount");
  let success = true;
  let existsUser = await userCollection.findOne({_id: ObjectID(accountObject.id)}); 
  if(existsUser == null || existsUser == undefined)
  {
    console.log(`Can't find book with ID ${accountObject.id}`);
    success = false;
  }
  else{
    userCollection.updateOne({_id: ObjectID(accountObject.id)}, 
                           {$set: {
                             email : accountObject.email,
                             age : accountObject.age,
                             email : accountObject.email,
                             email : accountObject.email,
                             address_city : accountObject.address_city,
                             address_district : accountObject.address_district,
                             address : accountObject.address,
                             avatar_image: accountObject.avatar_image
                           }});
    success = true;
  }
  return success; 
} 