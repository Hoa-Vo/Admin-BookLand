const previewImage = function (event) {
    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById("previewImg");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };