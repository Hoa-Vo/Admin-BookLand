const express = require("express");
const router = express.Router();
const checkOutController = require("../controllers/checkoutController");
const authenticator = require("../middleware/authenticator");

router.get("/", authenticator.credentialUser, checkOutController.renderCheckOutPage);

module.exports = router;
