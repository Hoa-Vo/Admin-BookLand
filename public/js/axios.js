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
form.addEventListener('submit', e => {
  e.preventDefault();
  const files = document.getElementsByName("book-image")[0].files[0];
  const title = document.getElementsByName("titleInput")[0].value;
  const basePrice = document.getElementsByName("basePriceInput")[0].value;
  const author = document.getElementsByName("authorInput")[0].value;
  const publisher = document.getElementsByName("publisherInput")[0].value;
  const formData = new FormData();
  formData.append('bookImage', files);
  async function run(url) {
    const response=await axios.post(url,formData);
    return response;
  }
  formData.append('title',title);
  formData.append("basePrice",basePrice);
  formData.append("author",author);
  formData.append("publisher",publisher);
  run("http://localhost:5500/bookslist/createNew").then(res=>{
    return res.data.imageName;
  })
      .then(imageName=>{
        formData.append("imageName",imageName);
        run("http://localhost:3000/api/admin-send-image").then(res=>{
          console.log(res);
          alert("Them thanh cong!!");
        });
      })
});