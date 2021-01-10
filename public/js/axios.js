function delBook(id) {
  let ID = id.split("-");
  let answer = window.confirm("Thay đổi trạng thái cuốn sách này?");
  if (answer) {
    axios
      .delete("/bookslist", {
        params: {
          id: ID[0],
        },
      })
      .then(res => {
        if (res.status === 202) {
          if (res.data === true) {
            $(`#${ID[0]}`).html("<p>Đã xóa</p>");
          } else {
            $(`#${ID[0]}`).html("<p>Tồn tại</p>");
          }
        } else {
          alert("Lỗi khi thực hiên!!!");
        }
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    //some code
  }
}
function editBook(id) {
  let ID = id.split("-");
  axios
    .patch("/bookslist", {
      id: ID[0],
      type: "edit",
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}

const previewImage = function (event) {
  let reader = new FileReader();
  reader.onload = function () {
    let output = document.getElementById("preview");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
const form = document.getElementById("submitForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  $(".loader").css("display", "flex");
  const files = document.getElementsByName("bookImage")[0].files[0];
  const title = document.getElementsByName("titleInput")[0].value;
  const basePrice = document.getElementsByName("basePriceInput")[0].value;
  const author = document.getElementsByName("authorInput")[0].value;
  const publisher = document.getElementsByName("publisherInput")[0].value;
  const formData = new FormData();
  formData.append("bookImage", files);
  async function run(url) {
    const response = await axios.post(url, formData);
    return response;
  }
  formData.append("titleInput", title);
  formData.append("basePriceInput", basePrice);
  formData.append("authorInput", author);
  formData.append("publisherInput", publisher);
  run("/bookslist/createNew").then(res => {
    $(".loader").css("display", "none");
    if (res.status === 202) {
      alert("Thêm thành công");
    } else {
      alert("Lỗi khi thêm");
    }
  });
});
