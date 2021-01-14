const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { constants } = require("crypto");

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
    avatar_image: "notfound.jpg",
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