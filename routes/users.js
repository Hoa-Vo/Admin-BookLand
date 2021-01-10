const express = require("express");
const router = express.Router();
const usersController=require("../controllers/usersController");
const accountController=require("../controllers/userAccountController");
router.get("/",usersController.renderUsersLayout);
router.get("/search-paging",usersController.renderSearchAndPaging);
router.get("/profile/:id",accountController.getUsersByID);
module.exports=router;