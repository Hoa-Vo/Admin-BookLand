function delBook(id) {
  let ID = id.split("-");
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

function addBook() {
  const title = document.getElementsByName("titleInput")[0].value;
  console.log(title);
}

var Handlebars = require("handlebars");

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});
