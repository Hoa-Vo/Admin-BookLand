const express = require("express");
const router = express.Router();
const usersController=require("../controllers/usersController");

router.get("/",usersController.renderUsersLayout);
router.get("/profile/:id",usersController.renderUsersAndPaging);
router.get("/paging",usersController.renderUsersAndPaging);

module.exports=router;