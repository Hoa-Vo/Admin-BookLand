const express = require("express");
const router = express.Router();

const changeAccountInformationController = require("../controllers/changeAccountInfoController"); 

router.get("/", changeAccountInformationController.renderChangeAccountInfoPage); 
router.post("/", changeAccountInformationController.changeAccountInfo); 


module.exports = router;