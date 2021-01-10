const express = require("express");
const router = express.Router();
const verifyController = require("../controllers/verifyController");

router.get("/:id",verifyController.verifyEndpoint); 


module.exports = router;