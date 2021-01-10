let OKemail, OKusername,OKpassword = false; 
let OKemailSyntax = false; 
let buttonElement = document.getElementById("register-button");

window.onload = function(){
  console.log("Inside onload");
  OKemail, OKusername,OKpassword, OKemailSyntax = false; 
};

function validateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true);
  }
  return (false);
}

let updateStatusRegisterButton = () => 
{
  let valueSet = !(OKemail && OKemailSyntax && OKusername && OKpassword); 
  buttonElement.disabled = valueSet;
  if(valueSet)
  {
    buttonElement.style = "background-color: black";
  }
  else{
    buttonElement.style = "background-color: red";
  }
}

let getCurrentStatus = () => buttonElement.disabled; 

function checkPassword()
{
  const passwordString = document.getElementById("password-box").value;
  let notifyElement = document.getElementById("passwordcheck-notify"); 
  if(passwordString == "")
  {
    OKpassword = false; 
    updateStatusRegisterButton(); 
    notifyElement.innerHTML = "&#10005 Mật khẩu không được để trống";
    notifyElement.style = "color:red "; 
  }
  else{
    notifyElement.innerHTML = "";
    OKpassword = true; 
    updateStatusRegisterButton();
  }
}


function checkRepassword() {
  let notifyElement = document.getElementById("repasswordcheck-notify"); 
  const passwordString = document.getElementById("password-box").value;
  const repasswordString = document.getElementById("repassword-box").value;
  if (passwordString === repasswordString && passwordString != "") {
    notifyElement.innerHTML = "&#10003";
    notifyElement.style = "color:#006400 "; 
    OKpassword = true;
    updateStatusRegisterButton();
  }
  else if(passwordString == "")
  {
    OKpassword = false; 
    updateStatusRegisterButton(); 
    notifyElement = document.getElementById("passwordcheck-notify"); 
    notifyElement.innerHTML = "&#10005 Mật khẩu không được để trống";
  }
  else{
   notifyElement.innerHTML = "&#10005 Phải trùng với mật khẩu";
   notifyElement.style = "color:red "; 
   OKpassword = false;
   updateStatusRegisterButton(); 
  }
}

function checkExistedEmail() {
  let email = (document.getElementById("email-box").value);
  let notifyElement = document.getElementById("emailcheck-notify"); 
  if(email != "")
  {
    if(validateEmail(email))
    {
      OKemailSyntax = true; 
      $.ajax({
        url: "api/checkExistedEmail",
        type: "GET",
        data: {email : document.getElementById("email-box").value},
        
        statusCode: {
          404: function () {},
          202: function (res) {
            if(res)
            {
              OKemail = false  ;
              updateStatusRegisterButton(); 
              notifyElement.innerHTML = "&#10005 Email này đã được đăng kí, bạn có muốn <a href = '/login'>đăng nhập</a>";
              notifyElement.style = "color: red"; 
            }
            else{
              OKemail = true; 
              updateStatusRegisterButton(); 
              notifyElement.innerHTML = "&#10003 Bạn có thể dùng email này";
              notifyElement.style = "color: #006400";
              
            }
          },
        },
      });
    }
    else
    {
      OKemailSyntax = false; 
      updateStatusRegisterButton(); 
      notifyElement.innerHTML = "&#10005 Email này không đúng cú pháp, thử cú pháp đúng xbc@syz";
      notifyElement.style = "color: red"; 
    }
    
  }
  else{
    notifyElement.innerHTML = "&#10005 Email không được rỗng</a>";
    notifyElement.style = "color: red"; 
    OKemail = false; 
    updateStatusRegisterButton();
  }
}
function checkExistedUsername() {
  const username = document.getElementById("username-box").value;
  let notifyElement = document.getElementById("usercheck-notify"); 
  if(username != ""){
    $.ajax({
      url: `api/checkExistedUsername/`,
      type: "GET",
      data: {
        name: username,
      },
      statusCode: {
        404: function () {},
        202: function (res) {
          
          console.log(res);
          if(res)
          {
            OKusername = false; 
            updateStatusRegisterButton();
            notifyElement.innerHTML = "&#10005 Tên đăng nhập đã tồn tại, chọn tên khác";
            notifyElement.style = "color: red"; 
          }
          else{
            OKusername = true; 
            updateStatusRegisterButton();
            notifyElement.innerHTML = "&#10003 Bạn có thể dùng tên đăng nhập này";
            notifyElement.style = "color: #006400"; 
            
          }
        },
      },
      error: function (jqXHR, textStatus, err) {
        console.log(err);
      },
    });
  }
  else{
    notifyElement.innerHTML = "&#10005 Tên đăng nhập không được rỗng!";
    notifyElement.style = "color: red"; 
    OKusername = false; 
    updateStatusRegisterButton();
  
  }
  
}
