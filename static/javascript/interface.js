// ! Funcion de Chat

const contenedor = document.querySelector(".container");
const repuestos = document.getElementById("1");
const accesorios = document.getElementById("2");
const contactos = document.getElementById("3");
const cilindraje = document.getElementById("4");
const marca = document.getElementById("5");
const modelo = document.getElementById("6");
const chat = document.getElementById("chat");
const reload = document.getElementById("reload");
const r1 = document.getElementById("r1");
const r1a = document.getElementById("r1a");
const r2 = document.getElementById("r2");
const r2a = document.getElementById("r2a");
const catalogo = document.getElementById("catalogo");
const catalogoAcc = document.getElementById("catalogo-acc");
const sobreNosotros = document.getElementById("sobre-nosotros");
const selectContainer = document.querySelector(".Select__container");
const select2 = document.querySelector(".select-2");
const select3 = document.querySelector(".select-3");

// funciones

function mostrarReload() {
  reload.style.display = "block";
  setTimeout(function () {
    reload.style.opacity = "1";
  }, 100);
}

function mostrarR1() {
  r1.innerText = opcion1;
  r1.style.display = "block";
  r1a.style.display = "block";
  setTimeout(function () {
    r1.style.opacity = "1";
  }, 100);
  setTimeout(() => (r1a.style.opacity = "1"), 750);
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
  r2.innerText = opcion2;
  r2.style.display = "block";
  r2a.style.display = "block";
  setTimeout(function () {
    r2.style.opacity = "1";
  }, 100);
  setTimeout(() => (r2a.style.opacity = "1"), 750);
}

function ocultarO2() {
  cilindraje.style.display = "none";
  marca.style.display = "none";
  modelo.style.display = "none";
}

function mostrarCatalogo() {
  catalogo.style.display = "flex";
  setTimeout(() => (catalogo.style.opacity = "1"), 4500);
}

function mostrarCatalogoAcc() {
  catalogoAcc.style.display = "flex";
  setTimeout(() => (catalogoAcc.style.opacity = "1"), 4500);
}

function mostrarsobreNosotros() {
  sobreNosotros.style.display = "block";
  setTimeout(() => (sobreNosotros.style.opacity = "1"), 3000);
}

// animaciones
function efectoMaquinaDeEscribir(texto, element, i = 0) {
  if (i < texto.length) {
    document.getElementById(element).innerHTML += texto.charAt(i);
    setTimeout(function () {
      efectoMaquinaDeEscribir(texto, element, i + 1);
    }, 50);
  }
}

// opciones

let opcion1;
let opcion2;

// click

repuestos.addEventListener("click", () => {
  opcion1 = repuestos.value;
  mostrarR1();
  setTimeout(function () {
    efectoMaquinaDeEscribir(
      "Perfecto, ahora selecciona alguna de estas opciones",
      "r1a"
    );
  }, 900);
  ocultarO1();
  mostrarO2();
  mostrarReload();
});

accesorios.addEventListener("click", () => {
  opcion1 = accesorios.value;
  mostrarR1();
  setTimeout(function () {
    efectoMaquinaDeEscribir(
      "Muy bien, estos son nuestros accesorios disponibles",
      "r1a"
    );
  }, 900);
  ocultarO1();
  mostrarCatalogoAcc();
  mostrarReload();
});

contactos.addEventListener("click", () => {
  opcion1 = contactos.value;
  mostrarR1();
  setTimeout(function () {
    efectoMaquinaDeEscribir("Estos son nuestros datos de contacto", "r1a");
  }, 900);
  ocultarO1();
  mostrarsobreNosotros();
  mostrarReload();
});

// Filtro
cilindraje.addEventListener("change", function () {
  // Filtramos la lista de productos
  var filteredProducts = catalogo.querySelectorAll(".producto");
  var selectedCylinder = cilindraje.value;

  filteredProducts.forEach(function (producto) {
    if (
      producto.querySelector(".producto-inf .cilindraje").innerText !=
      selectedCylinder
    ) {
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
    if (
      producto.querySelector(".producto-inf .marca").innerText != selectedBrand
    ) {
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
    if (
      producto.querySelector(".producto-inf .modelo").innerText != selectedBrand
    ) {
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

$(".Select__container").on("change", function () {
  // Obtenemos el valor del select
  var cilindraje = $(this).val();

  // Filtramos los datos
  $("#catalogo")
    .find(".producto")
    .each(function () {
      if ($(this).find(".producto-inf .cilindraje").text() != cilindraje) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
});

cilindraje.addEventListener("click", () => {
  opcion2 = cilindraje.value;
  mostrarR2();
  setTimeout(function () {
    efectoMaquinaDeEscribir(
      "Muy bien, aquí están nuestros repuestos por su Cilindraje",
      "r2a"
    );
  }, 900);
  ocultarO2();
  mostrarCatalogo();
  selectContainer.style.display = "flex";
  selectContainer.style.justifyContent = "center";
  selectContainer.style.alignItems = "center";
  selectContainer.style.gap = "2%";
  setTimeout(function () {
    selectContainer.style.opacity = "1";
  }, 4000);
});

marca.addEventListener("click", () => {
  opcion2 = marca.value;
  mostrarR2();
  setTimeout(function () {
    efectoMaquinaDeEscribir(
      "Muy bien, aquí están nuestros repuestos segun su Marca",
      "r2a"
    );
  }, 900);
  ocultarO2();
  mostrarCatalogo();
  select2.style.display = "flex";
  select2.style.justifyContent = "center";
  select2.style.alignItems = "center";
  select2.style.gap = "2%";
  setTimeout(function () {
    select2.style.opacity = "1";
  }, 4000);
});

modelo.addEventListener("click", () => {
  opcion2 = modelo.value;
  mostrarR2();
  setTimeout(function () {
    efectoMaquinaDeEscribir(
      "Muy bien, aquí están nuestros repuestos segun su Modelo",
      "r2a"
    );
  }, 900);
  ocultarO2();
  mostrarCatalogo();
  select3.style.display = "flex";
  select3.style.justifyContent = "center";
  select3.style.alignItems = "center";
  select3.style.gap = "2%";
  setTimeout(function () {
    select3.style.opacity = "1";
  }, 4000);
});

// ! Filtrado de Datos

$("#cilindraje-filter").click(function () {
  const selectedCilindraje = $("#cilindraje-select").val();

  $.ajax({
    url: "/get_products_by_filters",
    method: "POST",
    data: { cilindraje: selectedCilindraje },
    success: function (response) {
      updateProductList(response);
    },
    error: function (error) {
      console.error("AJAX call failed:", error);
    },
  });
});

$("#marca-filter").click(function () {
  const selectedMarca = $("#marca-select").val();

  $.ajax({
    url: "/get_products_by_filters",
    method: "POST",
    data: { marca: selectedMarca },
    success: function (response) {
      updateProductList(response);
    },
    error: function (error) {
      console.error("AJAX call failed:", error);
    },
  });
});

$("#modelo-filter").click(function () {
  const selectedModelo = $("#modelo-select").val();

  $.ajax({
    url: "/get_products_by_filters",
    method: "POST",
    data: { modelo: selectedModelo },
    success: function (response) {
      updateProductList(response);
    },
    error: function (error) {
      console.error("AJAX call failed:", error);
    },
  });
});

$(".reset").click(function () {
  $.ajax({
    url: "/get_products_by_filters",
    method: "POST",
    data: {},
    success: function (response) {
      updateProductList(response);
    },
  });
});

function updateProductList(products) {
  $("#catalogo").empty();

  if (products.length === 0) {
    $("#catalogo").append(
      "<div class='select-no-products'>No hay repuestos existentes</div>"
    );
  } else {
    products.forEach((product) => {
      console.log(product);
      if (product) {
        const productElement = `
    <article class="producto">
      <div class="img">
        <img src="/show_image/repuesto/${product[0]}" alt="Imagen del repuesto" />
      </div>
      <div class="producto-inf">
        <p>Nombre: <span>${product[1]}</span></p>
        <p>Marca: <span>${product[2]}</span></p>
        <p>Modelo: <span>${product[3]}</span></p>
        <p>Cilindraje: <span>${product[4]}</span></p>
        <p>Cantidad: <span>${product[5]}</span></p>
        <p>Precio: <span>${product[6]}</span></p>
      </div>
      <div class="product-btn">
        <div class="boton-whatsapp">
          <div class="boton-whatsapp--icon">
            <img src="/static/img/whatsapp.svg" alt="maps" />
          </div>
          <div class="boton-whatsapp--text">
            <a href="https://web.whatsapp.com/" target="_blank"
              >Ir a whatsapp</a
              >
          </div>
        </div>
      </div>
    </article>
  `;

        // Add the new product element to the list
        $("#catalogo").append(productElement);
      }
    });
  }
}
