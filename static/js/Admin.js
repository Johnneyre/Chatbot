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
  reader.onerror = function (error) {
    console.log("An error occurred while reading the file: ", error);
  };
  reader.readAsDataURL(event.target.files[0]);
}

// ! Validaciones

document
  .querySelector(".form-repuestos")
  .addEventListener("submit", function (event) {
    let inputs = this.querySelectorAll(
      'input[type="text"], input[type="number"], input[type="file"], select'
    );

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        alert("No se puede agregar, ningún campo puede estar en blanco");
        event.preventDefault();
        return;
      }
    }
  });

document
  .querySelector(".form-accesorios")
  .addEventListener("submit", function (event) {
    let inputss = this.querySelectorAll(
      'input[type="text"], input[type="number"], input[type="file"]'
    );

    for (let i = 0; i < inputss.length; i++) {
      if (!inputss[i].value) {
        alert("Ningún campo puede estar en blanco");
        event.preventDefault();
        return;
      }
    }
  });

document
  .querySelector(".form-repuestos")
  .addEventListener("submit", function (event) {
    let inputs = this.querySelectorAll('input[type="number"]');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value < 0) {
        alert("No se puede agregar, la cantidad no puede ser negativa");
        event.preventDefault();
        return;
      }
    }
  });

document
  .querySelector(".form-accesorios")
  .addEventListener("submit", function (event) {
    let inputs = this.querySelectorAll('input[type="number"]');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value < 0) {
        alert("La cantidad no puede ser negativa");
        event.preventDefault();
        return;
      }
    }
  });
