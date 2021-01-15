

function addNewCategory()
{
    const newCategoryName = document.getElementById("categoryInput").value ; 
    console.log(newCategoryName)
    let notifyElement = document.getElementById("notify-element"); 

    if(newCategoryName != "")
    {
        $.ajax({
            url: document.url,
            type: "POST",
            data: 
            {
                newCategoryName: newCategoryName
            },
            statusCode: {
                404: function () {},
                202: function (res) {
                    if(!res)
                    {
                        notifyElement.innerHTML = "Đã tồn tại category này!"; 
                        notifyElement.style = "color: red;"
                    }
                    else{
                        window.location.href = "/";
                    }
                }
            }
        })
    }
    else{
        notifyElement.innerHTML = "Tên không được rỗng"; 
        notifyElement.style = "color: red;"
    }
}