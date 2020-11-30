const express = require("express");
const register = express.Router();
const registerController = require("../controllers/registerController");
/* GET register page. */
register.get("/", registerController.renderRegisterPage);

module.exports = register;
