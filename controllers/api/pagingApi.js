const booksModel = require("../../models/booksModel");

exports.paging = async (req, res, next) => {
  const data = await booksModel.paging(
    req.query.page,
    req.query.pagelimit,
    req.query.categoryId,
    req.query.searchText
  );
  res.send({ data });
};
