let currentPage = 1;
let maxPage = 0;
let totalItems = 0;
let userToShow;
let isSingedIn = false;
const maxItemsPerPage = 6;
let statusArray;
let filterSelection="Tất cả";

window.onload = function () {
  let currentPage = 1;
  let maxPage = 0;
  let totalItems = 0;
  const maxItemsPerPage = 10;
  $(document).ready(function () {
    load_user_orders_and_paging();
    load_all_order_status();
  });
  
};

async function load_user_orders_and_paging() {
  $("#searchForm").click(function (event) {
    event.preventDefault();
  });
  
  const searchtext=$("#searchText").val();
  let success=false;
  $.ajax({
    url: "/orders/search-paging",
    method: "GET",
    data: {
      searchtext:searchtext,
      pageLimit: maxItemsPerPage,
      page: currentPage,
      user:userToShow,
      filter:filterSelection,
    },
    statusCode:{
    200:  function (res)
      {
          if (res.ordersList) {
              totalItems = res.length;
              setPageNumber();
              update_orders_table(res.ordersList, res.length);
              $("#info").css("display", "none");
          }
          else{
            $(".table-responsive").css("display", "none");
            $("#info").css("display", "flex");
            $("#info").html("<p>Không tìm thấy đơn hàng nào</p>");
            
          }
          success=true;
      
      },
    204: function (res)
      {
        $(".table-responsive").css("display", "none");
        $("#info").css("display", "flex");
        $("#info").html("<p>Không tìm thấy đơn hàng nào</p>");
      },
    },
    error: function () {
        alert("Lỗi tải danh sách người dùng");
    },
  });
  return success;
}

async function selectionChanged(choice)
{
  filterSelection=choice;
  load_user_orders_and_paging(); 
}

async function load_all_order_status()
{
  let success=false;
  await $.ajax({
    url: "/orders/all-status",
    method:"GET",
    data:{
      
    },
    statusCode:
    {
      202: (res)=>{
        statusArray=res;
        success=true;
      },
      204: ()=>{
        success=false;
      }
    }
  });
  return success;
}

async function update_order_status(orderID, status)
{
  let success=false;
  await $.ajax({
    url:"/orders/update-order-status",
    method:"POST",
    data: 
    {
        orderID:orderID,
        status:status,
    },
    statusCode:
    {
      202: (res)=>{
        success=true;
      },
      204: (res)=>{
        success=false;
      }
    }
  });
  return success;
}

async function nextStatus(id)
{
  let orderID=id.split('-')[0].toString();
  const orderStatusId= `${orderID}-status`;
  let curStatus=document.getElementById(orderStatusId).innerHTML;
  let index= statusArray.findIndex(element=>element.status==curStatus);

  let nextStatus=null;
  if(index==statusArray.length-1){
    nextStatus=statusArray[0].status;
  }
  else{
    nextStatus=statusArray[index+1].status;
  }
  let check =await update_order_status(orderID,nextStatus);
  if(check==true)
  {
    var text=document.getElementById(orderStatusId);
    text.innerHTML=`${nextStatus}`;
  }
}

async function previousStatus(id)
{
  let orderID=id.split('-')[0].toString();
  const orderStatusId= `${orderID}-status`;
  let curStatus=document.getElementById(orderStatusId).innerHTML;
  let index= statusArray.findIndex(element=>element.status==curStatus);

  let prevStatus=null;
  if(index==0){
    prevStatus=statusArray[statusArray.length-1].status;
  }
  else{
    prevStatus=statusArray[index-1].status;
  }
  let check =await update_order_status(orderID,prevStatus);
  
  if(check)
  {
    var text=document.getElementById(orderStatusId);
    text.innerHTML=`${prevStatus}`;
  }
}

function update_orders_table(ordersList, count) {
    //update comment frame and paging;
    $(".table-responsive").css("display", "block");
    const source = $("#orders-list").html();
    const template = Handlebars.compile(source);
    $("#mytable").html(template(ordersList));
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
  
  
  function prevBtnClick() {
    if (currentPage > 1) {
      $("#info").css("display", "flex");  
      currentPage--;
      setPageNumber();
      load_user_orders_and_paging()();
    }
  }
  
  function nextBtnClick() {
    if (currentPage < maxPage) {
      $("#info").css("display", "flex");  
      currentPage++;
      setPageNumber();
      load_user_orders_and_paging()();
    }
  }
  function setPage(num) {
  
    currentPage = parseInt(num);
    $("#info").css("display", "flex");  
    setPageNumber();
    load_user_orders_and_paging()();
  }
  