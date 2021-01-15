const express = require("express");
const router = express.Router();
const accountController = require("../controllers/userAccountController");

router.get("/", accountController.get);
router.post("/", accountController.editUserAvatar); 
router.get("/:id", accountController.get);

module.exports = router;
