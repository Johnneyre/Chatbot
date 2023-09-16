const contenedor = document.querySelector(".container");
const repuestos = document.getElementById("1");
const accesorios = document.getElementById("2");
const contactos = document.getElementById("3");
const cilindraje = document.getElementById("4");
const marca = document.getElementById("5");
const modelo = document.getElementById("6");
const chat = document.getElementById("chat");
const reload = document.getElementById("reload");
const r1 = document.getElementById("r1")
const r1a = document.getElementById("r1a");
const r2 = document.getElementById("r2");
const r2a = document.getElementById("r2a");
const catalogo = document.getElementById("catalogo");
const sobreNosotros = document.getElementById("sobre-nosotros");
const selectContainer = document.querySelector(".Select__container");
const select2 = document.querySelector(".select-2");
const select3 = document.querySelector(".select-3");

// funciones

function mostrarReload() {
  reload.style.display = "block"
  setTimeout(function () { reload.style.opacity = "1"}, 100);
}

function ocultarO1() {
  repuestos.style.display = "none";
  accesorios.style.display = "none";
  contactos.style.display = "none";
}

function mostrarO2() {
  setTimeout(function () {
    cilindraje.style.display = "block";
    marca.style.display = "block";
    modelo.style.display = "block";
    cilindraje.style.opacity = "1";
    marca.style.opacity = "1";
    modelo.style.opacity = "1";
  }, 4000);
}

function mostrarR2() {
  r2.style.display = "block"
  r2a.style.display = "block"
}

function ocultarO2() {
  cilindraje.style.display = "none";
  marca.style.display = "none";
  modelo.style.display = "none";
}

// animaciones 
function efectoMaquinaDeEscribir(texto, element, i = 0) {
  if (i < texto.length) {
    document.getElementById(element).innerHTML += texto.charAt(i);
    setTimeout(function () { efectoMaquinaDeEscribir(texto, element, i + 1); }, 50);
  }
}


// opciones 

let opcion1
let opcion2

// click 

repuestos.addEventListener("click", () => {
  opcion1 = repuestos.value;
  r1.innerText = opcion1;
  r1.style.display = "block"
  setTimeout(function () { r1.style.opacity = "1"}, 100);
  setTimeout(() => r1a.style.opacity = "1", 750);
  setTimeout(function () { efectoMaquinaDeEscribir("Perfecto, ahora selecciona alguna de estas opciones", "r1a"); }, 900);
  ocultarO1();
  mostrarO2();
  mostrarReload()
})

accesorios.addEventListener("click", () => {
  opcion1 = accesorios.value;
  r1.innerText = opcion1;
  r1.style.display = "block"
  setTimeout(function () { r1.style.opacity = "1"}, 100);
  setTimeout(() => r1a.style.opacity = "1", 750);
  setTimeout(function () { efectoMaquinaDeEscribir("muy bien, estos son nuestros accesorios disponibles", "r1a"); }, 900);
  ocultarO1();
  setTimeout(() => catalogo.style.opacity = "1", 4000);

})

contactos.addEventListener("click", () => {
  opcion1 = contactos.value;
  r1.innerText = opcion1;
  r1.style.display = "block"
  setTimeout(function () { r1.style.opacity = "1"}, 100);s
  setTimeout(() => r1a.style.opacity = "1", 750);
  setTimeout(function () { efectoMaquinaDeEscribir("estos son nuestros datos de contacto", "r1a"); }, 900);
  ocultarO1();
  catalogo.style.display = "none";
  setTimeout(() => sobreNosotros.style.opacity = "1", 3000);
})

cilindraje.addEventListener("click", () => {
  opcion2 = cilindraje.value;
  r2.innerText = opcion2;
  r2.style.opacity = "1";
  setTimeout(() => r2a.style.opacity = "1", 750);
  setTimeout(function () { efectoMaquinaDeEscribir("Muy buen, aqui están nuestros repuestos por su cilindraje", "r2a"); }, 900);
  ocultarO2();
  setTimeout(() => catalogo.style.opacity = "1", 4000);
  selectContainer.style.display = "flex";
})


// Filtro
cilindraje.addEventListener("change", function () {
  // Filtramos la lista de productos
  var filteredProducts = catalogo.querySelectorAll(".producto");
  var selectedCylinder = cilindraje.value;

  filteredProducts.forEach(function (producto) {
    if (producto.querySelector(".producto-inf .cilindraje").innerText != selectedCylinder) {
      producto.style.display = "none";
    } else {
      producto.style.display = "flex";
    }
  });
});

marca.addEventListener("change", function () {
  // Filtramos la lista de productos
  var filteredProducts = catalogo.querySelectorAll(".producto");
  var selectedBrand = marca.value;

  filteredProducts.forEach(function (producto) {
    if (producto.querySelector(".producto-inf .marca").innerText != selectedBrand) {
      producto.style.display = "none";
    } else {
      producto.style.display = "flex";
    }
  });
});

modelo.addEventListener("change", function () {
  // Filtramos la lista de productos
  var filteredProducts = catalogo.querySelectorAll(".producto");
  var selectedBrand = modelo.value;

  filteredProducts.forEach(function (producto) {
    if (producto.querySelector(".producto-inf .modelo").innerText != selectedBrand) {
      producto.style.display = "none";
    } else {
      producto.style.display = "flex";
    }
  });
});

function resetFilters() {
  cilindraje.value = "";
  marca.value = "";
  modelo.value = "";

  // Ocultamos las secciones de selección
  selectContainer.style.display = "none";
  select2.style.display = "none";
  select3.style.display = "none";

  // Mostramos la lista de productos sin filtros
  catalogo.style.opacity = "1";
}

// resetButton.addEventListener("click", resetFilters);

$(".Select__container").on("change", function() {
  // Obtenemos el valor del select
  var cilindraje = $(this).val();

  // Filtramos los datos
  $("#catalogo").find(".producto").each(function() {
    if ($(this).find(".producto-inf .cilindraje").text() != cilindraje) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
});

// Hasta Aqui
marca.addEventListener("click", () => {
  opcion2 = marca.value;
  mostrarR2();
  r2.innerText = opcion2;
  r2a.innerText = "Muy buen, aqui están nuestros repuestos segun su marca";
  ocultarO2();
  catalogo.style.display = "flex";
  select2.style.display = "flex";
})

modelo.addEventListener("click", () => {
  opcion2 = modelo.value;
  mostrarR2();
  r2.innerText = opcion2;
  r2a.innerText = "Muy buen, aqui están nuestros repuestos segun su modelo";
  ocultarO2();
  catalogo.style.display = "flex";
  select3.style.display = "flex";
})