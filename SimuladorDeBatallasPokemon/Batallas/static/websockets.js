let url = `ws://${window.location.host}/ws/socket-server/`;

const chatSocket = new WebSocket(url);

chatSocket.onmessage = function(evento){
    let datos = JSON.parse(evento.data);
    console.log("Datos: ", datos);

    if (datos.type === 'chat') {
        let mensajes = document.getElementById('contenedorMensajes');

        mensajes.insertAdjacentHTML('beforeend', 
        `<div> <h1> ${datos.message} </h1> </div>`
        )
    }

}

let formularioDePrueba = document.getElementById("formularioDePrueba");

formularioDePrueba.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let mensaje = event.target.inputDePrueba.value;
    let mensajeJSON = JSON.stringify(
        {'mensaje':mensaje}
        );
    chatSocket.send(mensajeJSON);
    console.log("json: ", mensajeJSON);
    formularioDePrueba.reset();
})