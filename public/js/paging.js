let booksPerPage = 6;
let totalBook;
let maxPage;
let currentPage = 1;
$(document).ready(() => {
  fetchData(currentPage, booksPerPage);
  $("#mytable #checkall").click(function () {
    if ($("#mytable #checkall").is(":checked")) {
      $("#mytable input[type=checkbox]").each(function () {
        $(this).prop("checked", true);
      });
    } else {
      $("#mytable input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
      });
    }
  });
  $("[data-toggle=tooltip]").tooltip();
});
function prevBtnClick() {
  if (currentPage > 1) {
    console.log(currentPage);
    currentPage--;
    fetchData(currentPage, booksPerPage);
  }
}
function nextBtnClick() {
  if (currentPage < maxPage) {
    currentPage++;
    fetchData(currentPage, booksPerPage);
  }
}
function inThisPage(currentPage) {
  const id = `page-${currentPage}`;
  document.getElementById(id).classList.add("active");
}
function setPage(num) {
  currentPage = parseInt(num);
  fetchData(currentPage, 6);
}
async function fetchData(currentPage, booksPerPage) {
  const category_id=document.getElementById("category_id").textContent;
  console.log(category_id);
  $.ajax({
    url: "/bookslist/page",
    type: "GET",
    data: {
      page: currentPage,
      pagelimit: booksPerPage,
      category: category_id,
    },
    success: function (res) {
      let content = "";
      let title,
        bookdetail,
        view,
        edit,
        del,
        index = 1;
      totalBook = res.data.totalBook;
      console.log(totalBook);
      maxPage = Math.ceil(totalBook / booksPerPage);
      console.log(res.data);
      res.data.books.forEach(book => {
        title = `<tr id="${book._id}"><td><input type="checkbox" class="checkthis" /></td><td>${index}</td><td><img class="book-image" src="images/booksImage/${book.image_link}" /> </td><td><div class="book-info">${book.title}</div></td>`;
        bookdetail = `<td><div class="book-info">${book.basePrice} VND</div></td><td><div class="book-info">${book.author}</div></td><td><div class="book-info">${book.publisher}</div></td>`;
        view = `<td><p data-placement="top" data-toggle="tooltip" title="Delete"><a href="./${book._id}"><button class="btn btn-success btn-xs" data-title="See" data-toggle="modal"><i class="fas fa-eye"></i></button></a></p></td>`;
        edit = `<td><p data-placement="top" data-toggle="tooltip" title="Edit"><a href="/bookslist/edit/${book._id}"><button id="${book._id}-edit" class="btn btn-primary btn-xs" data-title="Edit"data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></a></p></td>`;
        del = `<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button id="${book._id}-del" onclick="delBook(this.id)"class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal"><i class="far fa-trash-alt"></i></p></td></tr>`;
        content += title + bookdetail + view + edit + del;
        index++;
      });
      let allBtn = "";
      let pageNumberBar =
        " <li class='page-item'> <a id='prevBtn' onclick='prevBtnClick()' class='page-link' aria-label='Previous'> <span aria-hidden='true'>&laquo;</span> <span class='sr-only'>Previous</span> </a> </li>";
      for (let i = 1; i <= maxPage; i++) {
        allBtn += `<li  id='page-${i}' class='page-item'><a onclick='setPage(this.textContent)' class='page-link'>${i}</a></li>`;
      }
      allBtn +=
        "<li class='page-item'> <a id='nextBtn' onclick='nextBtnClick()' class='page-link' aria-label='Next'> <span aria-hidden='true'>&raquo;</span> <span class='sr-only'>Next</span> </a> </li>";
      pageNumberBar += allBtn;
      $(".pagination").html(pageNumberBar);
      $("#books-list").html(content);
      inThisPage(currentPage);
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
