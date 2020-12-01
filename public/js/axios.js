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
  const basePrice = document.getElementsByName("basePriceInput")[0].value;
  const author = document.getElementsByName("authorInput")[0].value;
  const publisher = document.getElementsByName("publisherInput")[0].value;
  const image = document.getElementsByName("image")[0].files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("preview").src = reader.result;
  };
  if (image) {
    reader.readAsDataURL(image);
  } else {
  }
  axios
    .put("/bookslist/createNew", {
      title: title,
      basePrice: basePrice,
      author: author,
      publisher: publisher,
    })
    .then(res => {
      console.log(res.d);
    })
    .catch(err => {
      console.error(err);
    });
}
