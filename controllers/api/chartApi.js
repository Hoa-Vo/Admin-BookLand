const { json } = require("body-parser");
const { join } = require("path");
const statisticService = require("../../services/statisticalService");

exports.getChartData = async (req, res, next) => {
  const data = await statisticService.getChartData(req.query.year);
  res.json(data);
};
exports.getTopSale = async (req, res, next) => {
  const data = await statisticService.getTopSale();
  res.json(data);
};
