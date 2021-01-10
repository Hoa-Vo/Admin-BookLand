const accountServices = require("../services/accountServices");

exports.verifyEndpoint = async (req, res, next) => {
  const id = req.params.id;
  await accountServices.vefifyEmail(id);
  console.log("OK verified email with id: " + id);
  res.redirect("/");
};
