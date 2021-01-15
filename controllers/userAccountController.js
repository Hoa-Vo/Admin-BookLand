const usersModel = require("../models/usersModel");
const accountModel = require("../models/accountModel");
const formidable = require("formidable");
const booksListModel=require("../models/booksModel");

exports.get = async (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    userToShow=await accountModel.getUserById(req.user._id);
    const user = await accountModel.getUserById(req.user._id);

    res.render("userAccount/account", {
      id: user._id,
      name: user.name,
      email: user.email,
      role:user.role,
      address:user.address,
      address_district:user.address_district,
      address_city:user.address_city,
      super_admin:user.super_admin,
      isVerified:user.isVerified,
      isLocked: user.isLocked,
      avatar_image: user.avatar_image,
      userToShow:userToShow,
    });
  }
  else 
    res.redirect("/login");
  
};

exports.getUsersByID = async (req, res, next) => {
  
  let userToShow=null;
  if(req.user)//phải đăng nhập mới được xem
  {
    userToShow=await accountModel.getUserById(req.user._id);
    const user = await usersModel.getUserById(req.params.id);
    if(user!=undefined && user!="" && user!=null){
      res.render("userAccount/account", {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar_image: user.avatar_image,
        role:user.role,
        address:user.address,
        address_district:user.address_district,
        address_city:user.address_city,
        super_admin:user.super_admin,
        isVerified:user.isVerified,
        isLocked: user.isLocked,
        userToShow:userToShow,
      });
    }
    else 
    {
      res.render("userAccount/account", {
        id: userToShow._id,
        name: userToShow.name,
        email: userToShow.email,
        role:userToShow.role,
        isVerified:userToShow.isVerified,
        isLocked: userToShow.isLocked,
        address:userToShow.address,
        address_district:userToShow.address_district,
        address_city:userToShow.address_city,
        super_admin:userToShow.super_admin,
        avatar_image: userToShow.avatar_image,
        userToShow:userToShow,
      });
    }
  }
  else 
    res.redirect("/login");
  
};

exports.editUserAvatar = async (req, res, next) => {
  const receiveForm = formidable.IncomingForm();
  await receiveForm.parse(req, (err, fields, files) => {
    if (err || files.avatarImageInput.type !== "image/jpeg") {
      res.status(204).send("error!");
    } else {
      accountModel
        .saveAvatar(files)
        .then(imageName => {
          let toChangeAvatarUser = {
            id: fields.IdToChangeAvatar,
            avatar_image: imageName,
          };
          return toChangeAvatarUser;
        })
        .then(toChangeAvatarUser => {
          console.log(toChangeAvatarUser.avatar_image);
          console.log(toChangeAvatarUser.id);
          accountModel
          .editAvatar(toChangeAvatarUser).then(result => {
            if (result === true) {
              res.status(202).redirect("/account");
            } else {
              res.send(204).end();
            }
          });
        });
    }
  });
};


exports.lockAccount=async(req,res,next)=>
{
  let result=await usersModel.lockUserAccount(req.body.userID, req.body.accountID);
  if(result.success==true)
  {
    res.status(202).send(result.success);
  }
  else
  {
    res.status(204).end();
  }
}

exports.unlockAccount=async(req,res,next)=>
{
  let result=await usersModel.unlockUserAccount(req.body.userID, req.body.accountID);
  if(result.success==true)
  {
    res.status(202).send(result.success);
  }
  else
  {
    res.status(204).end();
  }
}
