const acccountServices = require("../../services/accountServices");


exports.checkExistEmail  = async (req,res,next) => 
{
    console.log(req.query.email);
    let result = await acccountServices.checkExistsEmail(req.query.email);
    console.log("check email result: " + result);
    res.status(202).send(result);
}