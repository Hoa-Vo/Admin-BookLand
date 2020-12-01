function delBook(id) {
  let ID = id.split("-");
  let answer = window.confirm("Delete this book?");
  if (answer) {
    axios
      .delete("/bookslist", {
        params: {
          id: ID[0],
        },
      })
      .then(res => {
        if (res.status === 202) {
          document.getElementById(ID[0]).remove();
        } else {
          alert("Can't delete this book!!!");
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
      console.log(res.d);
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
