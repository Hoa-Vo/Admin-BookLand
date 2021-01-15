
const express = require("express");
const router = express.Router();

const changepasswordController = require("../controllers/changePasswordController");


router.get("/", changepasswordController.renderChangePasswordPage); 
router.post("/", changepasswordController.checkAndChange);


module.exports = router;