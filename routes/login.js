const express = require("express");
const login = express.Router();
const loginController = require("../controllers/loginController");
/* GET login page. */
login.get("/", loginController.renderLoginPage);

module.exports = login;

setTimeout(() => {});
