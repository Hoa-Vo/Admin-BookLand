const accountModel = require("../models/accountModel");
const smtpTransport = require("nodemailer-smtp-transport");
const nodemailer = require("nodemailer");
const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv/config");

exports.sendVerifyEmail = async userid => {
  let transport = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  );

  const user = await accountModel.getUserById(userid);
  console.log(user);
  const emailToSend = user.email;
  const usernameToSend = user.name; 
  let mailOptions = {
    from: process.env.MAIL_NAME,
    to: emailToSend,
    subject: "[No reply] Xác nhận tài khoản BookLand của bạn",
    html: `<p> Xin hãy xác nhận tài khoản: ${usernameToSend} của bạn qua đường dẫn localhost:3000/verify/${userid}<p>`,
  };

  //console.log("Inside mail serviceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent " + info.response);
    }
  });
};

exports.checkValidPassword = async (id, plainPassword) => {
  const userpasswordCollection = await db().collection("User-hashPassword");
  const foundUser = await userpasswordCollection.findOne({ _id: ObjectID(id) });
  console.log("hashed passs: ");
  console.log(foundUser.password);

  return bcrypt.compareSync(plainPassword, foundUser.password);
};

exports.registerNewuser = async (newUsername, plainNewPassword, newEmail) => {
  console.log(newUsername, plainNewPassword, newEmail);
  let res = await accountModel.addNewUser(newUsername, plainNewPassword, newEmail);
  console.log("ressssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  console.log(res)
  //let newuser = await accountModel.getUserByUsername(newUsername);
  this.sendVerifyEmail(res);
};

exports.vefifyEmail = async id => {
  await accountModel.changeVerifyStatus(id, true);
};

exports.checkExistsUsername = async inputUsername => {
  let result = await accountModel.isExistsUsername(inputUsername);

  return result;
};

exports.checkExistsEmail = async inputEmail => 
{
  let result = await accountModel.isExistsEmail(inputEmail); 
  return result; 
}
