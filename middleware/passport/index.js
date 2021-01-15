const flash = require('connect-flash');
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const accountModel = require("../../models/accountModel");
const accoutServices = require("../../services/accountServices") 

passport.use(new localstrategy (
  async function(username,password,done)
 {
    console.log("Inside strategy execution"); 
    const existUser = await accountModel.getUserByUsername(username); 
    console.log(`Inside strategy execution: ${existUser}`); 
    if(existUser === null || existUser === undefined)
    {
      return done(null,false, {message:'Username không tồn tại!'});
    }
    // check password
    console.log(existUser);
    const idToCheckPassword = existUser._id; 
    console.log("type of id: "); 
    console.log(typeof idToCheckPassword);
    console.log(`Inside strategy execution: id: ${idToCheckPassword}`); 
    const passwordCheck = await accoutServices.checkValidPassword(idToCheckPassword,password); 
    console.log(`Inside strategy execution: passcheck: ${passwordCheck}`); 
    // check locked
    const lockedCheck = existUser.isLocked; 
    console.log(`Is locked: ${lockedCheck}`);
    if(!passwordCheck)
    {
      return done(null,false, {message:'Sai mật khẩu!'});
    }

    if(lockedCheck)
    {
      return done(null,false, {message: 'Tài khoản của bạn đã bị khoá, liên hệ chúng tôi!'})
    }
    return done(null,existUser); 
 }
));
 
 passport.serializeUser(function(user,done){
   done(null,user._id); 
 });
 
 passport.deserializeUser(async function(id,done) 
 {
   const user = await accountModel.getUserById(id); 
   done(null,user); 
 });

 module.exports = passport; 