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
    const category =req.query.filter;
    
    const userOrdersList=await ordersModel.getUserOrderList(category,searchText,currentPage,pageLimit);

    if (userOrdersList!=undefined && userOrdersList!=null){
        const length=userOrdersList.length;
        if(userOrdersList.length!=0){
            res.status(200).send({ordersList:userOrdersList, length:length, userToShow:userToShow});
        }
        else {
            res.status(204).send({userToShow:userToShow, length:0});
        }
    }
    else {
        console.log("204");
    res.status(204).send({userToShow:userToShow, length:0});
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

exports.updateOrderStatus=async (req,res,next)=>
{
    const orderID=req.body.orderID;
    const status=req.body.status;
    const success=await ordersModel.updateOrderStatus(orderID,status);
    if(success)
    {
        res.status('202').end();
    }
    else
    {
        res.status('204').end();
    }
}

exports.getAllOrderStatus=async (req,res,next)=>
{
    const orderStatusList=await ordersModel.getAllOrderStatus();
    if(orderStatusList)
    {
        res.status('202').json(orderStatusList);
    }
    else
    {
        res.status('204').end();
    }
}