
$(document).ready(() => {
    const accountID=$('#account-id').text();
    pTagContent = $("#user-info").html();
    const userID = pTagContent.split(">")[1].split("<")[0];
    console.log(accountID);
    console.log(userID);
    if(userID==accountID)
    {
        $("#btnLockAccount").css("display","none");
        $("#btnUnlockAccount").css("display","none");
    }
    else
    {
        const isLocked= $("#is-locked").text();
        if(isLocked==true){
        $("#btnLockAccount").css("display","none");
        $("#btnUnlockAccount").css("display","block");
        }
        else if(isLocked==false)
        {
            $("#btnLockAccount").css("display","block");
            $("#btnUnlockAccount").css("display","none");
        }
    }
});

async function LockAccount()
{
    const accountID=$("#account-id").text();
    console.log(accountID);
    await $.ajax({
        url: "/users/profile/lock-account",
        method:"POST",
        data:{
            id:accountID,
        },
        statusCode: 
        {
            202: (res)=>{
                
                $("#btnLockAccount").css("display","none");
                $("#btnUnlockAccount").css("display","block");
                document.getElementById('div-is-locked').innerHTML="<p>Bị khóa</p>";      
                $("#is-locked").text('Bị khóa');
            },
            204: (res)=>{
                $("#btnLockAccount").css("display","block");
                $("#btnUnlockAccount").css("display","none");     

                document.getElementById('div-is-locked').innerHTML="<p>Bình thường</p>";      
                $("#is-locked").text('Bình thường');

            }
        },
    
      });
}

async function UnlockAccount()
{
    const accountID=$("#account-id").text();
    console.log(accountID);
    await $.ajax({
        url: "/users/profile/unlock-account",
        method:"POST",
        data:{
            id:accountID,
        },
        statusCode: 
        {
            202: (res)=>{
                $("#btnLockAccount").css("display","block");
                $("#btnUnlockAccount").css("display","none");
                document.getElementById('div-is-locked').innerHTML="<p>Bình thường</p>";      

                $("#is-locked").text('Bình thường');
            },
            204: (res)=>{
                $("#btnLockAccount").css("display","none");
                $("#btnUnlockAccount").css("display","block");
                document.getElementById('div-is-locked').innerHTML="<p>Bị khóa</p>";      

                $("#is-locked").text('Bị khóa');
            }
        },
    
      });
}