// Esta función duerme hasta que alguien la llama
function activarModoHacker() {
  // 1. Agarramos el título
  let titulo = document.getElementById("titulo-nombre");

  // 2. Lo cambiamos (Solo ocurrirá al hacer click)
  titulo.innerText = "SYSTEM HACKED BY S.I.T.O.";
  titulo.style.color = "#ff003c"; // Rojo Alerta
  titulo.style.fontSize = "50px"; // Lo hacemos gigante

  console.log("¡Acceso concedido!");
}

// 1. Preguntarle al sistema qué hora es (0 - 23)
let fecha = new Date();
let hora = fecha.getHours();

// 2. Seleccionar el lugar donde escribiremos
let saludo = document.getElementById("mensaje-bienvenida");

// 3. LA LÓGICA (El Cerebro)
// Si la hora es menor a 12 (mañana)...
if (hora < 12) {
  saludo.innerText = "🌞 Good Morning, Angel!";
  saludo.style.color = "#fcee0a"; // Amarillo Mañana
}
// Si no (tarde/noche)...
else {
  saludo.innerText = "🌙 Good Evening, Angel!";
  saludo.style.color = "#a78bfa"; // Violeta Noche
}

// Para que veas en la consola qué hora detectó
console.log("La hora detectada es: " + hora);
