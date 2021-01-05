const usersModel=require("../models/usersModel");

exports.renderUsersLayout=async (req,res,next)=>
{
    res.render("./users/users-management");
}

exports.renderSearchAndPaging=async(req,res,next)=>
{
    const currentPage=req.query.page;
    const pageLimit=req.query.pageLimit;
    const searchText=req.query.searchtext;
    const usersList=await usersModel.fetchUsersAndPaging(searchText,currentPage,pageLimit);
    
    if (usersList!=undefined && usersList!=null && usersList!=""){
        const count=await usersModel.getUsersCount(searchText);
        console.log(count);
        res.status(200).send({usersList:usersList, count:count});
    }
    else {
        res.status(204).end();
    }
}
