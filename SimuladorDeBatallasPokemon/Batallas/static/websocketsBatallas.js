const elementoTituloDeBatalla = document.getElementById("tituloBatalla");
const id = elementoTituloDeBatalla.dataset.id;

let url = `ws://${window.location.host}/ws/batallas/${id}/`;

let formularioDePrueba = document.getElementById("formularioDePrueba");
let contenedorMensajes = document.getElementById("contenedorMensajes");

const chatSocket = new WebSocket(url);

chatSocket.onmessage = function(evento) {
    let datos = JSON.parse(evento.data);
    console.log("Datos: ", datos);

    if (datos.type === 'chat') {
        let mensaje = datos.message;
        let elementoMensaje = document.createElement("p");
        elementoMensaje.innerHTML = mensaje;
        contenedorMensajes.insertBefore(elementoMensaje, null);
    }
}


formularioDePrueba.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let mensaje = event.target.contenido.value;
    let mensajeJSON = JSON.stringify(
        {'mensaje':mensaje}
        );

    chatSocket.send(mensajeJSON);

    console.log("json: ", mensajeJSON);
    formularioDePrueba.reset();
    
})