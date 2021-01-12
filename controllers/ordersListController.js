const usersModel=require("../models/usersModel");
const accountModel=require("../models/accountModel");
const ordersModel=require("../models/ordersModel");

exports.renderOrdersLayout=async (req,res,next)=>
{
    let userToShow=null;
    if(req.user)
    {
        userToShow=await accountModel.getUserById(req.user._id);
        res.render("./ordersPage/ordersList",
        {
            userToShow:userToShow,
            isSignedIn:true,
        });
    }
    else{
        res.redirect('/login');
    }
    
}

exports.renderSearchAndPaging=async(req,res,next)=>
{
    let userToShow=null;
    if(req.user)
    {
        userToShow=await accountModel.getUserById(req.user._id);
        
    }
    const currentPage=req.query.page;
    const pageLimit=req.query.pageLimit;
    const searchText=req.query.searchtext;

    const userOrdersList=await ordersModel.getUserOrderList(searchText,currentPage,pageLimit);
    if (userOrdersList!=undefined && userOrdersList!=null && userOrdersList!=""){
        const length=await ordersModel.getOrdersCount();
        res.status(200).send({ordersList:userOrdersList, length:length, userToShow:userToShow});
    }
    else {
        res.status(204).send({userToShow:userToShow, count:length});
    }
}

exports.getOrderByID=async(req,res,next)=>
{
    let userToShow = null;
    if (req.user) {
        isSignedIn = true;
        userToShow = await accountModel.getUserById(req.user._id);

        const orderID=req.params.id;
        const orderDetail=await ordersModel.getOrderById(orderID);
        const userDetail=await accountModel.getUserById(orderDetail.userID);
        res.render("./ordersPage/orderDetail", { userToShow: userToShow, orderDetail:orderDetail ,userDetail:userDetail});
    }
    else{
        res.redirect('/login');
    }
    
}

exports.getOrderBookByID=async (req,res,next)=>
{
    const orderId=req.query.id;
    const bookInfo=await ordersModel.getOrderBookByID(orderId);
    if(bookInfo.length>0)
    {
        res.json(bookInfo);
    }
    else{
        res.send("empty");
    }
}