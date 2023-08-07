var i = 0;
var txt = 'Bienvenido a Moto Betel';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("saludo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}