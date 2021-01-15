const orderModel = require("../models/ordersModel");
const bookModel = require("../models/booksModel");
exports.getChartData = async year => {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const arr = await orderModel.getAllTransportedOrder();

  for (const element of arr) {
    if (element.create_date.getFullYear().toString() === year) {
      const month = element.create_date.getMonth();
      data[month] = element.totalMoney;
    }
  }

  return { months, data };
};

exports.getTopSale = async () => {
  let data = [];
  let temp = [];
  let result = [];
  let topSale = [];
  let totalNumber = 0;
  const orders = await orderModel.getAllTransportedOrder();
  for (const order of orders) {
    for (const book of order.books) {
      if (!data.some(x => x.id.toString() === book.id.toString())) {
        data.push(book);
      }
      temp.push(book);
    }
  }
  for (const book of data) {
    const tokens = getAppearence(book, temp);
    const x = {
      id: book.id,
      number: tokens[1],
      apearence: tokens[0],
    };
    result.push(x);
  }
  result.sort((a, b) => {
    return a.number - b.number;
  });
  if (result.length > 10) {
    for (let i = result.length - 1; i >= 0; i--) {
      topSale.push(result[i]);
    }
  } else {
    const books = await bookModel.getbooksInIdArr(result);
    for (const book of books) {
      for (const element of result) {
        if (book._id.toString() === element.id.toString()) {
          book.number = element.number;
        }
      }
    }
    return books;
  }
};

const getAppearence = (book, bookArr) => {
  let result = 0;
  let quantity = 0;
  for (const element of bookArr) {
    if (element.id.toString() === book.id.toString()) {
      result++;
      quantity += element.quantity;
    }
  }
  return [result, quantity];
};
