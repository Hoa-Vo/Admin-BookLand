let currentPage = 1;
let maxPage = 0;
let totalItems = 0;
let userToShow;
let isSingedIn = false;
let currentCategory="users";
const maxItemsPerPage = 6;

window.onload = function () {
  let currentPage = 1;
  let maxPage = 0;
  let totalItems = 0;
  const maxItemsPerPage = 10;
  $(document).ready(function () {
    load_user_paging();
  });
  
};

async function load_user_paging() {
  $("#searchForm").click(function (event) {
    event.preventDefault();
  });
  //isSignedIn=isSignedIn();
  const searchtext=$("#searchText").val();
  await $.ajax({
    url: "/users/search-paging",
    method: "GET",
    data: {
      searchtext:searchtext,
      pageLimit: maxItemsPerPage,
      page: currentPage,
      user:userToShow,
      category:currentCategory,
    },
    success: function (response) {
      if (true) {
        totalItems = response.count;
        setPageNumber();
        update_users_table(response.usersList, response.count);
        $("#info").css("display", "none");
      }
      else
      {
        $("#info").css("display", "flex");
        $("#info").html("<p>Không tìm thấy người dùng nào</p>");
        $(".table-responsive").css("display", "none");
      }
      return false;
    },
    error: function () {
      alert("Lỗi tải danh sách người dùng");
    },
  });
}

function selectionChanged(choice)
{
  currentCategory=choice;
  console.log(currentCategory);
  load_user_paging();
}

function isSignedIn() {
  //lay user fomr layout.hbs
  let userId = $("#user-id").val();
  let userName = $("#user-name").val();
  let userEmail = $("#user-email").val();
  if (userId == "" || userId == undefined || userId == null) {
    userToShow = null;
    isSingedIn = false;
  } else {
    userToShow = { id: userId, name: userName, email: userEmail };
    isSingedIn = true;
  }
  return isSingedIn;
}

function search_text_handler()
{
  const text=$("#searchText").val();
  return text;
}

function update_users_table(usersList, count) {
  //update comment frame and paging;
  const source = $("#users-list").html();
  const template = Handlebars.compile(source);
  $("#mytable").html(template(usersList));
}


function setPageNumber() {
  maxPage = Math.ceil(totalItems / maxItemsPerPage);
  if (maxPage != 0) {
    let page = [];
    const firstPage =
      maxPage <= 5 ? 1 : currentPage + 5 - 1 > maxPage ? maxPage - 5 + 1 : currentPage;
    const lastPage =
      maxPage <= 5 ? maxPage : currentPage + 5 - 1 > maxPage ? maxPage : currentPage + 5 - 1;
    for (var i = firstPage; i <= lastPage; i++) {
      const temp = { curPage: `${i}` };
      page.push(temp);
    }
    const source = $("#paging-list").html();
    const template = Handlebars.compile(source);
    $("#btn-list").html(template(page));
    const id = `page-${currentPage}`;
    document.getElementById(id).classList.add("active");
  }
}

function refresh_comment_post()
{
    if(isSingedIn==false){
        document.getElementById("YourName").value="";
        document.getElementById('YourEmail').value="";
    }
    document.getElementById("YourThoughts").value="";
}

function prevBtnClick() {
  if (currentPage > 1) {
    $("#info").css("display", "flex");  
    currentPage--;
    setPageNumber();
    load_user_paging();
  }
}

function nextBtnClick() {
  if (currentPage < maxPage) {
    $("#info").css("display", "flex");  
    currentPage++;
    setPageNumber();
    load_user_paging();
  }
}
function setPage(num) {

  currentPage = parseInt(num);
  $("#info").css("display", "flex");  
  setPageNumber();
  load_user_paging();
}

function is_signed_in() {
  //lay user fomr layout.hbs
  let userId = $("#user-id").text();
  let userName = $("#user-name").text();
  let userEmail = $("#user-email").text();
  if (userId == "" || userId == undefined || userId == null) {
    userToShow = null;
    isSingedIn = false;
  } else {
    userToShow = { id: userId, name: userName, email: userEmail };
    isSingedIn = true;
  }
  return isSingedIn;
}

