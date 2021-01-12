const express = require("express");
const router = express.Router();
const ordersListController=require("../controllers/ordersListController");
const accountController=require("../controllers/userAccountController");
router.get("/",ordersListController.renderOrdersLayout);
router.get("/search-paging",ordersListController.renderSearchAndPaging);
router.get("/order-detail/book-info",ordersListController.getOrderBookByID);
router.get("/order-detail/:id",ordersListController.getOrderByID);
module.exports=router;