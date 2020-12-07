function toogleHideAndShowDropDown()
{
    var childDiv = document.getElementById("filter-dropdown");
    var a = childDiv.getElementsByTagName("a");
    //console.log(childDiv.style.display);
    if(childDiv.style.display === "block")
    {
        childDiv.style.display = "none"; 
        console.log("Switch to display none");
    }
    else
    {
        console.log("Switch to block");

        childDiv.style.display="block";
    }
    
}