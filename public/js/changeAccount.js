
const previewImage = function (event) {
    console.log("Inside preview image");
    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById("preview");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}