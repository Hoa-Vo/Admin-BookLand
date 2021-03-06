const usersModel=require("../models/usersModel");
const accountModel=require("../models/accountModel");

exports.renderUsersLayout=async (req,res,next)=>
{
    let userToShow=null;
    if(req.user)
    {
        userToShow=await accountModel.getUserById(req.user._id);
        res.render("./usersManagement/users-management",
        {
            userToShow:userToShow,
            isSignedIn:true,
        });
    }
    else 
    {
        res.redirect('/login');
    }
    
}

exports.renderSearchAndPaging=async(req,res,next)=>
{
    let userToShow=null;
    if(req.user)
    {
        userToShow=await accountModel.getUserById(req.user._id);
    }
    const currentPage=req.query.page;
    const pageLimit=req.query.pageLimit;
    const searchText=req.query.searchtext;
    const category=req.query.category;
    const usersList=await usersModel.fetchUsersAndPaging(category,searchText,currentPage,pageLimit);

    if (usersList!=undefined && usersList!=null && usersList!=""){
        const count=await usersModel.getUsersCount(category, searchText);
        res.status(200).send({usersList:usersList, count:count, userToShow:userToShow});
    }
    else {
        res.status(204).send({userToShow:userToShow});
    }
    
}
