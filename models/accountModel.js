const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { constants } = require("crypto");

// get user by ID
exports.getUserById = async id => {
  const userCollection = await db().collection("registeredUser");
  const user = await userCollection.findOne({ _id: ObjectID(id) });
  return user;
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

// try add new user
exports.addNewUser = async function (newUsername, plainNewPassword, newEmail) {
  const userCollection = await db().collection("registeredUser");
  const userpasswordCollecton = await db().collection("User-hashPassword");
  const newInserted = await userCollection.insertOne({
    name: newUsername,
    age: 10,
    email: newEmail,
    avatar_image: "notfound.jpg",
    isVerified: false,
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
  const userCollection = await db().collection("registeredUser");
  await userCollection.updateOne({ _id: ObjectID(id) }, { $set: { isVerified: newVerifyStatus } });
};

exports.isExistsUsername = async inputUsername => {
  const userCollection = await db().collection("registeredUser");
  let userDocument = await userCollection.findOne({ name: inputUsername });
  if (userDocument) {
    return true;
  } else {
    return false;
  }
};

exports.isExistsEmail = async inputEmail => {
  const userCollection = await db().collection("registeredUser");
  const userDocument = await userCollection.findOne({ email: inputEmail });
  if(userDocument)
  {
    return true; 
  }
  else{
    return false;
  }
  
}