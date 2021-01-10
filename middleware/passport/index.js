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
        return done(null,false, {message: 'User not exist '});
      }
      // check password
      console.log(existUser);
      const idToCheckPassword = existUser._id; 
      console.log("type of id: "); 
      console.log(typeof idToCheckPassword);
      console.log(`Inside strategy execution: id: ${idToCheckPassword}`); 
      const passwordCheck = await accoutServices.checkValidPassword(idToCheckPassword,password); 
      console.log(`Inside strategy execution: passcheck: ${passwordCheck}`); 
 
      if(!passwordCheck)
      {
        return done(null,false, {message: 'Incorrect password'}); 
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