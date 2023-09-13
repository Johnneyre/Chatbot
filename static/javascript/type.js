function typeWriter(txt, index) {
    if (index < txt.length) {
      document.getElementById("saludo").innerHTML = txt.slice(0, index + 1);
      index++;
      setTimeout(function() {
        typeWriter(txt, index);
      }, speed);
    }
  }
  
  typeWriter('bienvenidos a Moto Betel', 0);