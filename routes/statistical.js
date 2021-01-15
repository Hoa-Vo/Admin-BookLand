const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/statisticalController");

router.get("/", statisticController.renderPage);

module.exports = router;
