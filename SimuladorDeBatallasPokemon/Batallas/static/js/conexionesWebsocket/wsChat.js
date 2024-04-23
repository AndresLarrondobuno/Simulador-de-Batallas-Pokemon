import { batalla } from "../batalla/main.js";
import { websocket } from "./iniciarConexionWs.js";
import { AdministradorDeChat } from "../batalla/administradorDeChat.js"
import { AdministradorDeOrdenes } from "../batalla/administradorDeOrdenes.js";
import { AdministradorDeInterfazDeBatalla } from "../batalla/administradorDeInterfazDeBatalla.js";

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
        let datosBatalla = datos.message;
        AdministradorDeOrdenes.asignarOrdenes(batalla, datosBatalla);
        window.dispatchEvent(turnoListoParaEjecutarse);
    }
    if (datos.type === 'actualizacionDeImagenDePokemonEnCombate') {
        let rol = datos.message;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);
    }
    if (datos.type === 'actualizacionDeBotonesDeMovimientos') {
        let rol = datos.message.rol;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        console.log("(manejarEventoMessage, tipo 'actualizacionDeBotonesDeMovimientos') entrenador: ", entrenador);
        AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
    }
    if (datos.type === 'holamundo') {
        console.log(datos.message);
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
websocket.onmessage = manejarEventoMessage; //handler para evento websocket 'message'

const turnoListoParaEjecutarse = new Event('turnoListoParaEjecutarse');