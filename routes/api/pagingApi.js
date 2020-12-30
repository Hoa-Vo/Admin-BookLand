const express = require("express");
const router = express.Router();
const pagingApi = require("../../controllers/api/pagingApi");

router.get("/", pagingApi.paging);

module.exports = router;
