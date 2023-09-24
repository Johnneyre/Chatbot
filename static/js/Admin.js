document
  .getElementById("repuestosButton")
  .addEventListener("click", function () {
    document.querySelector(".container-repuestos").style.display = "block";
    document.querySelector(".container-accesorios").style.display = "none";
  });
document
  .getElementById("accesoriosButton")
  .addEventListener("click", function () {
    document.querySelector(".container-accesorios").style.display = "block";
    document.querySelector(".container-repuestos").style.display = "none";
  });

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output_image");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
