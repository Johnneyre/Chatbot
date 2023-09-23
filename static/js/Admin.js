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
