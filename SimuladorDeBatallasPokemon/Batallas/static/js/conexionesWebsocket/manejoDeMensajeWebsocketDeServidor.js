import { batalla } from "../batalla/main.js";
import { websocket } from "./iniciarConexionWs.js";
import { AdministradorDeInterfazDeChat } from "../batalla/administradorDeInterfazChat.js"
import { AdministradorDeOrdenes } from "../batalla/administradorDeOrdenes.js";
import { AdministradorDeInterfazDeBatalla } from "../batalla/administradorDeInterfazDeBatalla.js";
import { AdministradorDeEventosDeBatalla } from "../batalla/administradorDeEventosDeBatalla.js";
import {
    obtenerRolDeBatallaDeUsuario,
    obtenerContenedorDeImagenesParaCambioAPartirDeRol,
    obtenerPokemonAPartirDeIdDeImagen
} from "../../../static/js/funcionesAuxiliares.js";


//(4) OUTPUT
function manejarMensajeDeServidor(evento) {
    let respuesta = JSON.parse(evento.data);

    if (respuesta.type === 'mensajeDeUsuario') {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirMensajeDeUsuario(mensaje);
    }

    if (respuesta.type === 'relatoDeAccionDeBatalla') {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirRelatoDeAccionDeBatalla(mensaje);
    }

    if (respuesta.type === 'actualizacionDeEstadoDeBatalla') {
        let datosBatallaActualizados = respuesta.message;
        AdministradorDeOrdenes.asignarOrdenes(batalla, datosBatallaActualizados);
        AdministradorDeEventosDeBatalla.ejecutarTurno();
        AdministradorDeEventosDeBatalla.siguienteTurno();

    }

    if (respuesta.type === 'actualizacionDeImagenDePokemonEnCombate') {
        let rol = respuesta.message;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);
    }

    if (respuesta.type === 'actualizacionDeBotonesDeMovimientos') {
        let rol = respuesta.message.rol;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
    }

    if (respuesta.type === 'notificacionDeMuerteDePokemon') {
        let rol = respuesta.message;

        if (rol === obtenerRolDeBatallaDeUsuario()) {
            AdministradorDeInterfazDeBatalla.desactivarListenersDeAccionesDeBatalla();
            let entrenador = batalla.obtenerEntrenadorPorRol(rol);

            entrenador.equipo.pokemons.forEach(pokemon => {
                if (pokemon.vivo) {
                    pokemon.enProcesoDeCambioForzado = true;
                    let imagen = pokemon.obtenerImagen();
                    AdministradorDeInterfazDeBatalla.iniciarAnimacionDePulso(imagen);
                    imagen.addEventListener("click", AdministradorDeEventosDeBatalla.ejecutarCambioForzadoPorMuerte());
                    //imagen.addEventListener("click", AdministradorDeEventosDeBatalla.ejecutarCambioForzadoPorMuerte());
                }
            });
        }
    }

    if (respuesta.type === 'notificacionDeCambioForzado') {

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
websocket.onmessage = manejarMensajeDeServidor; //handler para evento websocket 'message'