function delBook(id) {
  let ID = id.split("-");
  console.log(ID[0]);
  axios
    .delete("/bookslist", {
      params: {
        id: ID[0],
      },
    })
    .then(res => {
      console.log(res.data.text);
    })
    .catch(err => {
      console.error(err);
    });
}
function editBook(id) {
  let ID = id.split("-");
  axios
    .post("/bookslist", {
      id: ID[0],
      type: "edit",
    })
    .then(res => {
      console.log(res.data.text);
    })
    .catch(err => {
      console.error(err);
    });
}
