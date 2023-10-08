const repuestos = document.getElementById("repuestos");
const acc = document.getElementById("acc");

function mostrarRepuestos() {
  repuestos.style.display = "flex";
  setTimeout(function () {
    repuestos.style.opacity = "1";
  }, 100);
}

function mostrarAcc() {
  acc.style.display = "flex";
  setTimeout(function () {
    acc.style.opacity = "1";
  }, 100);
}

function ocutarRepuestos() {
  repuestos.style.opacity = "0";
  repuestos.style.display = "none";
}

function ocutarAcc() {
  acc.style.opacity = "0";
  acc.style.display = "none";
}

document
  .getElementById("repuestosButton")
  .addEventListener("click", function () {
    mostrarRepuestos();
    acc.style.display = "none";
    acc.style.opacity = "0";
  });

document
  .getElementById("accesoriosButton")
  .addEventListener("click", function () {
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

// ! Validaciones

document.querySelector("form").addEventListener("submit", function (event) {
  let inputs = this.querySelectorAll(
    'input[type="text"], input[type="number"], input[type="file"], select'
  );

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      alert("No se puede agregar, ningún campo puede estar en blanco");
      event.preventDefault();
      return;
    }
  }
});

document
  .querySelector('.guardar-acce')
  .addEventListener("click", function (event) {
    var form = document.querySelector("form");
    var inputs = form.querySelectorAll(
      'input[type="text"], input[type="number"], input[type="file"]'
    );

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        alert("Ningún campo puede estar en blanco");
        event.preventDefault();
        return;
      }
    }
  });
