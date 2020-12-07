function toogleHideAndShowDropDown()
{
    var childDiv = document.getElementById("filter-dropdown");
    var a = childDiv.getElementsByTagName("a");
    if(childDiv.style.display == "none")
    {
        childDiv.style.display = ""; 
    }
    else
    {
        childDiv.style.display="none";
    }
    
}