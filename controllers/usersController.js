const usersModel=require("../models/usersModel");

exports.renderUsersLayout=async (req,res,next)=>
{
    res.render("./users/users-management");
}

exports.renderUsersAndPaging=async(req,res,next)=>
{
    const currentPage=req.query.page;
    const pageLimit=req.query.pageLimit;
    const usersList=await usersModel.fetchUsersAndPaging(currentPage,pageLimit);
    
    if (usersList!=undefined && usersList!=null && usersList!=""){
        const count=await usersModel.getUsersCount();
        res.status(200).send({usersList:usersList, count:count});
    }
    else {
        res.status(204).end();
    }
}
