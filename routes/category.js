const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryPageController"); 


router.get("/", categoryController.render); 

module.exports = router; 