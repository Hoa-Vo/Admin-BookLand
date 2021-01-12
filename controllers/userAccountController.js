const accountModel = require("../models/accountModel");
const formidable = require("formidable");
const booksListModel=require("../models/booksModel");
exports.get = async (req, res, next) => {
  let userToShow=null;
  if(req.user)
  {
    userToShow=await accountModel.getUserById(req.user._id);
    
  }
  const user = await accountModel.getUserById(req.user._id);

    res.render("userAccount/account", {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified:user.isVerified,
      isLocked: user.isLocked,
      avatar_image: user.avatar_image,
      userToShow:userToShow,
    });
};

exports.getUsersByID = async (req, res, next) => {
  
  let userToShow=null;
  if(req.user)
  {
    userToShow=await accountModel.getUserById(req.user._id);
    
  }
  const user = await accountModel.getUserById(req.params.id);

    res.render("userAccount/account", {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar_image: user.avatar_image,
      isVerified:user.isVerified,
      isLocked: user.isLocked,
      userToShow:userToShow,
      isSignedIn:true,
    });

  
};

exports.editUserAvatar = async (req, res, next) => {
  const receiveForm = formidable.IncomingForm();
  await receiveForm.parse(req, (err, fields, files) => {
    if (err || files.avatarImageInput.type !== "image/jpeg") {
      res.status(204).send("error!");
    } else {
      booksListModel
        .saveAvatar(files)
        .then(imageName => {
          let toChangeAvatarUser = {
            id: fields.IdToChangeAvatar,
            avatar_image: imageName,
          };
          return toChangeAvatarUser;
        })
        .then(toChangeAvatarUser => {
          booksListModel.editAvatar(toChangeAvatarUser).then(result => {
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
  const accountIdToLock=req.body.id;
  console.log(accountIdToLock);
  let result=await accountModel.lockAccount(accountIdToLock);
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
  const accountIdToLock=req.body.id;
  console.log(accountIdToLock);
  let result=await accountModel.unlockAccount(accountIdToLock);
  if(result.success==true)
  {
    res.status(202).send(result.success);
  }
  else
  {
    res.status(204).end();
  }
}