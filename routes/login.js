const express = require("express");
const login = express.Router();
const loginController = require("../controllers/loginController");
const passport = require("../middleware/passport/index"); 
/* GET login page. */
login.get("/", loginController.renderLoginPage);
login.post("/", passport.authenticate('local', {successRedirect: "/",failureRedirect: "/login",failureFlash: true}));

module.exports = login;
