import { websocket } from "./iniciarConexionWs.js";
import { AdministradorDeChat } from "../batalla/administradorDeChat.js"

//(4) OUTPUT
function manejarEventoMessage(evento) {
    let datos = JSON.parse(evento.data);
    console.log("event.data: ", evento.data)
    console.log("Datos: ", datos);

    if (datos.type === 'mensajeDeUsuario') {
        let mensaje = datos.message;
        AdministradorDeChat.enviarMensajeDeUsuario(mensaje);
    }
    if (datos.type === 'relatoDeAccionDeBatalla') {
        let mensaje = datos.message;
        AdministradorDeChat.relatarAccionDeBatalla(mensaje);
    }
}


//(1) INPUT
function enviarMensajeWebsocketAServidor(event) {
    event.preventDefault();
    console.log(event.target);

    let mensaje = event.target.contenido.value;
    let mensajeJSON = JSON.stringify({
        'mensaje': mensaje,
        'type': 'mensajeDeUsuario',
    });

    websocket.send(mensajeJSON);

    console.log("json: ", mensajeJSON);
    formularioParaEnviarMensajeAServidor.reset();
}



let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");

//(1) INPUT
formularioParaEnviarMensajeAServidor.addEventListener('submit', enviarMensajeWebsocketAServidor);

//(4) OUTPUT
websocket.onmessage = manejarEventoMessage;