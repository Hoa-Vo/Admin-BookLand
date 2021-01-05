const express = require("express");
const router = express.Router();
const usersController=require("../controllers/usersController");

router.get("/",usersController.renderUsersLayout);
router.get("/profile/:id",usersController.renderSearchAndPaging);
router.get("/search-paging",usersController.renderSearchAndPaging);

module.exports=router;