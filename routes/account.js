const express = require("express");
const router = express.Router();
const accountController = require("../controllers/userAccountController");

router.get("/", accountController.get);
router.get("/:id", accountController.get);
router.post("/", accountController.editUserAvatar); 

module.exports = router;
