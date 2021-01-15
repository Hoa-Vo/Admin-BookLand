const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const bookModel = require("./booksModel");

exports.getOrdersCount = async searchText => {
  const ordersCollection = await db().collection("UserOrder");
  let count = 0;
  if (searchText != null && searchText != undefined)
    count = await ordersCollection.find({ name: { $regex: searchText, $options: "i" } }).count();
  else count = await ordersCollection.find({}).count();
  if (count == undefined) count = 0;
  return count;
};

exports.getUserOrderList = async (category, searchText, currentPage, pageLimit) => {
  const page = parseInt(currentPage);
  const limit = parseInt(pageLimit);
  let ordersCollection = await db().collection("UserOrder");
  let userOrderList = [{}];
  let statusDetail = await getStatusByName(category);

  //if(searchText!=null && searchText!=undefined &&
  if (category != null && category != undefined && category != "Tất cả") {
    //userOrderList=await ordersCollection.find({status:statusDetail.status},{ name: { $regex: searchText, $options: "i" }});
    userOrderList = await ordersCollection
      .find({ status: statusDetail.status })
      .skip(limit * page - limit)
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
  } else if (category == "Tất cả") {
    userOrderList = await ordersCollection
      .find({})
      .skip(limit * page - limit)
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
  }

  if (userOrderList != null && userOrderList != undefined) {
    let length = userOrderList.length;
    for (var i = 0; i < length; i++) {
      const books = userOrderList[i].books;
      userOrderList[i].totalCost = userOrderList[i].totalMoney + userOrderList[i].shippingCost;
    }
  }
  return userOrderList;
};

exports.getAllTransportedOrder = async () => {
  const ordersCollection = await db().collection("UserOrder");
  const orders = await ordersCollection.find({ status: "Đã giao hàng" }).toArray();
  return orders;
};

exports.getOrderById = async id => {
  let ordersCollection = await db().collection("UserOrder");
  let orderDetail = null;
  orderDetail = await ordersCollection.findOne({ _id: ObjectID(id) });

  return orderDetail;
};

exports.getOrderBookByID = async id => {
  let userOrderCollection = await db().collection("UserOrder");
  let userOrder = await userOrderCollection.findOne({ _id: ObjectID(id) });
  if (userOrder) {
    let books = userOrder.books;
    let booksInfo = await bookModel.getOrderBookByID(books);
    return booksInfo;
  } else {
    const booksInfo = [{}];
    return booksInfo;
  }
};

exports.getAllOrderStatus = async () => {
  let orderStatusCollection = await db().collection("OrderStatus");
  let statusList = await orderStatusCollection.find({}).toArray();
  return statusList;
};

exports.getStatusByName = async name => {
  let orderStatusCollection = await db().collection("OrderStatus");
  let existsStatus = null;
  return existsStatus;
};

exports.updateOrderStatus = async (orderId, status) => {
  let userOrderCollection = await db().collection("UserOrder");
  let existsStatus = getStatusByName(status);
  let success = false;
  if (existsStatus) {
    success = await userOrderCollection.updateOne(
      { _id: ObjectID(orderId) },
      { $set: { status: status } }
    );
  }
  return success;
};

exports.getAllYear = async () => {
  let years = [];
  const userOrderCollection = await db().collection("UserOrder");
  const allOrder = await userOrderCollection.find({}).toArray();
  for (const order of allOrder) {
    const year = order.create_date.getFullYear();
    if (!years.includes(year)) years.push(year);
  }
  return years;
};
const getStatusByName = async status => {
  let orderStatusCollection = await db().collection("OrderStatus");
  const existsStatus = await orderStatusCollection.findOne({ status: status });
  return existsStatus;
};
