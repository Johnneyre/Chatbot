const contenedor = document.querySelector(".container");
const boton1 = document.getElementById("1");
const boton2 = document.getElementById("2");
const boton3 = document.getElementById("3");
const boton4 = document.getElementById("4");
const boton5 = document.getElementById("5");
const boton6 = document.getElementById("6");
const chat = document.getElementById("chat");

const data = {
    Accesorios: 'LoremIpsumAccesorio',
    Info: 'LoremIpsumInfo'
}

let respuesta = document.createElement("P");
contenedor.appendChild(respuesta);

let chat1 = document.createElement("P");
contenedor.appendChild(chat1);

let chat2 = document.createElement("P");
// chat2.style.color = 'red'
contenedor.appendChild(chat2);

function mostrar(value) {
    document.getElementById("premio").style.display = "block";
    if (value === "Repuestos") {
        respuesta.innerHTML = `Yo: ${value}`;
        chat1.innerHTML = `Chat: ${value} es tu opcion seleccionada`;
        boton4.style.display = "inline-block";
        boton5.style.display = "inline-block";
        boton6.style.display = "inline-block";
    } else if (value === "Accesorios") {
        respuesta.innerHTML = `Yo: ${value}`;
        chat1.innerHTML = `Chat: ${value} es tu opcion seleccionada`;
        let tHtml = `<table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Accesorios</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>1</td>
                              <td>Nombre</td>
                            </tr>
                        </tbody>
                      </table>`
        chat2.innerHTML = tHtml;
    } else if (value === "Sobre Nosotros") {
        respuesta.innerHTML = `Yo: ${value}`;
        chat1.innerHTML = `Chat: ${value} es tu opcion seleccionada`;
        chat2.innerHTML = data.Info
    }
}

boton1.addEventListener("click", () => {
    console.log(boton1.value);
    boton1.style.display = "none";
    boton2.style.display = "none";
    boton3.style.display = "none";
    mostrar(boton1.value);
});

boton2.addEventListener("click", () => {
    console.log(boton2.value);
    boton1.style.display = "none";
    boton2.style.display = "none";
    boton3.style.display = "none";
    mostrar(boton2.value);
});

boton3.addEventListener("click", () => {
    console.log(boton3.value);
    boton1.style.display = "none";
    boton2.style.display = "none";
    boton3.style.display = "none";
    mostrar(boton3.value);
});