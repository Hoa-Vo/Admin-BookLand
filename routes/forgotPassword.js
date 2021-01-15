const express = require("express"); 
const forgotPasswordController = require("../controllers/forgotPasswordController");
const router = express.Router(); 

router.get("/", forgotPasswordController.renderForgotPasswordPage);
router.get("/:id", forgotPasswordController.renderEnterNewPasswordPage); 
router.post("/:id", forgotPasswordController.changePassword);


module.exports = router;