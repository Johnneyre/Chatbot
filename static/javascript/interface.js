const contenedor = document.querySelector(".container");
const repuestos = document.getElementById("1");
const accesorios = document.getElementById("2");
const contactos = document.getElementById("3");
const cilindraje = document.getElementById("4");
const marca = document.getElementById("5");
const modelo = document.getElementById("6");
const chat = document.getElementById("chat");
const r1 = document.getElementById("r1")
const r1a = document.getElementById("r1a");
const r2 = document.getElementById("r2");
const r2a = document.getElementById("r2a");
const catalogo = document.getElementById("catalogo");
const sobreNosotros = document.getElementById("sobre-nosotros");

// funciones

function ocultarO1() {
  repuestos.style.display = "none";
  accesorios.style.display = "none";
  contactos.style.display = "none";
}

function mostrarO2() {
  cilindraje.style.display = "block";
  marca.style.display = "block";
  modelo.style.display = "block";
}

function mostrarR2() {
  r2.style.display="block"
  r2a.style.display="block"
}

function ocultarO2() { 
  cilindraje.style.display = "none";
  marca.style.display = "none";
  modelo.style.display = "none";
}

// animaciones 

let texto = "Perfecto, ahora selecciona alguna de estas opciones";
let i = 0;

function efectoMaquinaDeEscribir() {
  if (i < texto.length) {
    document.getElementById("r1a").innerHTML += texto.charAt(i);
    i++;
    setTimeout(efectoMaquinaDeEscribir, 50);
  }
}
  

// opciones 

let opcion1 
let opcion2

// click 

repuestos.addEventListener("click", () => {
  opcion1 = repuestos.value;
  r1.innerText = opcion1;
  r1.style.opacity = "1"
  setTimeout(() => r1a.style.opacity = "1", 750);
  setTimeout(efectoMaquinaDeEscribir, 900);
  ocultarO1();
  mostrarO2();
})

accesorios.addEventListener("click", () => {
  opcion1 = accesorios.value;
  r1.innerText = opcion1;
  r1a.innerText = "Perfecto, aqui están nuestros accesorios disponibles"
  mostrarR1();
  ocultarO1();
  catalogo.style.display = "flex";

})

contactos.addEventListener("click", () => {
  opcion1 = contactos.value;
  r1.innerText = opcion1;
  r1a.innerText = "estos son nuestros datos de contacto"
  mostrarR1();
  ocultarO1();
  catalogo.style.display = "block";
})

cilindraje.addEventListener("click", () => {
  opcion2 = cilindraje.value;
  mostrarR2();
  r2.innerText = opcion2;
  r2a.innerText = "Muy buen, aqui están nuestros repuestos por su cilindraje";
  ocultarO2();
  catalogo.style.display = "flex";
})

marca.addEventListener("click", () => {
  opcion2 = marca.value;
  mostrarR2();
  r2.innerText = opcion2;
  r2a.innerText = "Muy buen, aqui están nuestros repuestos segun su marca";
  ocultarO2();
  catalogo.style.display = "flex";

})

modelo.addEventListener("click", () => {
  opcion2 = modelo.value;
  mostrarR2();
  r2.innerText = opcion2;
  r2a.innerText = "Muy buen, aqui están nuestros repuestos segun su modelo";
  ocultarO2();
  catalogo.style.display = "flex";

})
