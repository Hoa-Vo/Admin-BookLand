const orderModel = require("../models/ordersModel");
exports.renderPage = async (req, res, next) => {
  const allYear = await orderModel.getAllYear();
  const selectedYear = allYear[0];
  if (allYear.length === 1) {
    res.render("./statisticPage/statistic", { selectedYear: selectedYear });
  } else if (allYear.length < 1) {
    res.render("./statisticPage/statistic", { selectedYear: new Date().getFullYear() });
  } else {
    res.render("./statisticPage/statistic", { allYear: allYear, selectedYear: selectedYear });
  }
};
