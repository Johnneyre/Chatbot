const repuestos = document.getElementById("repuestos")
const acc = document.getElementById("acc")

function mostrarRepuestos() {
  repuestos.style.display = "flex";
  setTimeout(function () { repuestos.style.opacity = "1"}, 100);
}

function mostrarAcc() {
  acc.style.display = "flex";
  setTimeout(function () { acc.style.opacity = "1"}, 100);
}

function ocutarRepuestos() {
  repuestos.style.opacity = "0";
repuestos.style.display = "none";
}

function ocutarAcc() {
  acc.style.opacity = "0";
acc.style.display = "none";
}

document.getElementById("repuestosButton").addEventListener("click", function () {
  mostrarRepuestos();
  acc.style.display = "none";
  acc.style.opacity = "0";
});

document.getElementById("accesoriosButton").addEventListener("click", function () {
  mostrarAcc();
  ocutarRepuestos();
});

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("output_image");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
