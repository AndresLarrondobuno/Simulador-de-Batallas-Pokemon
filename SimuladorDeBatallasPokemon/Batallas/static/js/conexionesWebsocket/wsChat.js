import { websocket } from "./iniciarConexionWs.js";
import { AdministradorDeChat } from "../batalla/administradorDeChat.js"
import { AdministradorDeOrdenes } from "../batalla/administradorDeOrdenes.js";
import { batalla } from "../batalla/main.js";

//(4) OUTPUT
function manejarEventoMessage(evento) {
    let datos = JSON.parse(evento.data);

    if (datos.type === 'mensajeDeUsuario') {
        let mensaje = datos.message;
        AdministradorDeChat.imprimirMensajeDeUsuarioEnChat(mensaje);
    }
    if (datos.type === 'relatoDeAccionDeBatalla') {
        let mensaje = datos.message;
        AdministradorDeChat.imprimirRelatoDeAccionDeBatalla(mensaje);
    }
    if (datos.type === 'actualizacionDeEstadoDeBatalla') {
        let mensaje = datos.message;
        console.log("mensaje: ", mensaje);
        AdministradorDeOrdenes.asignarOrdenes(batalla, mensaje);
        window.dispatchEvent(turnoListoParaEjecutarse);
    }
}


//(1) INPUT
function enviarMensajeDeUsuarioViaWebsocket(event) {
    event.preventDefault();

    let mensaje = event.target.contenido.value;
    let username = event.target.dataset.username;

    let mensajeJSON = JSON.stringify({
        'message': mensaje,
        'type': 'mensajeDeUsuario',
        'username': username,
    });

    websocket.send(mensajeJSON);//cambiar por metodo auxiliar enviarMensajeAConsumidor

    formularioParaEnviarMensajeAServidor.reset();
}


let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");

//(1) INPUT
formularioParaEnviarMensajeAServidor.addEventListener('submit', enviarMensajeDeUsuarioViaWebsocket);

//(4) OUTPUT
websocket.onmessage = manejarEventoMessage;

const turnoListoParaEjecutarse = new Event('turnoListoParaEjecutarse');