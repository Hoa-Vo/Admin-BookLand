const express = require("express");
const router = express.Router();
const editSpecifiedBookController=require("../controllers/editSpecifiedBookController");
// Get booklist page
router.get("/",editSpecifiedBookController.renderEditSpecifiedPage);
router.get("/:id",editSpecifiedBookController.renderEditSpecifiedPage);

module.exports = router;