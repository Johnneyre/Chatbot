function typeEffect(txts, txtIndex, index, speed, isWriting, callback) {
    var txt = txts[txtIndex];
    if (isWriting && index < txt.length) {
        document.getElementById("saludo").innerHTML = txt.slice(0, index + 1);
        index++;
    } else if (!isWriting && index >= 0) {
        document.getElementById("saludo").innerHTML = txt.slice(0, index);
        index--;
    }

    if ((isWriting && index < txt.length) || (!isWriting && index >= 0)) {
        setTimeout(function () {
            typeEffect(txts, txtIndex, index, speed, isWriting, callback);
        }, speed);
    } else {
        callback();
    }
}

var texts = ['Bienvenido a Moto Betel', 'Aqui conoceras a Sotf-IA', 'Una asistente virtual', 'Te ayudará a conocer nuestros productos'];
var speeds = [200, 100];
var delays = [1000, 500];

function typeEffect(txts, txtIndex, index, speed, isWriting, callback) {
    var txt = txts[txtIndex];
    if (isWriting && index < txt.length) {
        document.getElementById("saludo").innerHTML = txt.slice(0, index + 1);
        index++;
    } else if (!isWriting && index >= 0) {
        document.getElementById("saludo").innerHTML = txt.slice(0, index);
        index--;
    }

    if ((isWriting && index < txt.length) || (!isWriting && index >= 0)) {
        setTimeout(function () {
            typeEffect(txts, txtIndex, index, speed, isWriting, callback);
        }, speed);
    } else {
        callback();
    }
}

function processTexts(texts, i) {
    if (i < texts.length) {
        typeEffect(texts, i, 0, speeds[0], true, function () {
            // Si no es la última frase, borra el texto actual después de un retraso
            if (i < texts.length - 1) {
                setTimeout(function () {
                    typeEffect(texts, i, texts[i].length - 1, speeds[1], false, function () {
                        processTexts(texts, i + 1);
                    });
                }, delays[0]);
            }
        });
    }
}

processTexts(texts, 0);