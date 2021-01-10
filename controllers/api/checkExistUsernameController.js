const acccountServices = require("../../services/accountServices");

exports.checkExistUsername = async (req, res, next) => {
  console.log("In check username controller");
  console.log(req.query.name);
  let result = await acccountServices.checkExistsUsername(req.query.name);
  console.log("check username result: " + result);
  res.status(202).send(result);
};
