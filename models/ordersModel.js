const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bookModel = require("./booksModel");


exports.getOrdersCount=async (searchText)=>
{
    const ordersCollection= await db().collection("UserOrder");
    let count=0;
    if(searchText!=null && searchText!=undefined && searchText!="")
        count=await ordersCollection.find({ name: { $regex: searchText, $options: "i" }}).count();
    else
        count=await ordersCollection.find({}).count();
    if(count==undefined)count=0;
    return count;
}

exports.getUserOrderList = async (searchText,currentPage, pageLimit)=> {
  const page =parseInt(currentPage);
  const limit=parseInt(pageLimit);
  let ordersCollection = await db().collection("UserOrder");
  let userOrderList = [{}];
  if(searchText!=null && searchText!=undefined && searchText!="")
    {
      userOrderList=await ordersCollection
        .find({ name: { $regex: searchText, $options: "i" }})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({_id:-1})
        .toArray();
    }
    else{
      userOrderList=await ordersCollection
        .find({})
        .skip(limit * page - limit)
        .limit(limit)
        .sort({_id:-1})
        .toArray();
    }
  if(userOrderList!=null && userOrderList!=undefined&& userOrderList!="")
  {
    let length=userOrderList.length;
    for (var i=0;i<length;i++)
    {
      const books=userOrderList[i].books;
      userOrderList[i].totalCost=await bookModel.getOrderInvoice(books);
    }
  }
  return userOrderList;
};


exports.getOrderById=async id=>
{
  let ordersCollection = await db().collection("UserOrder");
  let orderDetail=null;
  orderDetail=await ordersCollection.findOne({_id:ObjectID(id)});
  return orderDetail;
}

exports.getOrderBookByID = async id => {
  let userOrderCollection = await db().collection("UserOrder");
  let userOrder = await userOrderCollection.findOne({ _id: ObjectID(id) });
  if (userOrder) {
    let books = userOrder.books;
    let booksInfo = await bookModel.getOrderBookByID(books);
    return booksInfo;
  } 
  else
  {
    const booksInfo=[{}];
    return booksInfo;
  }
};