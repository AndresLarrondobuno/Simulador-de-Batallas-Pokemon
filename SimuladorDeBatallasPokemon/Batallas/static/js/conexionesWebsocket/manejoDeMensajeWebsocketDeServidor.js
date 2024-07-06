import { batalla } from "../batalla/main.js";
import { websocket } from "./iniciarConexionWs.js";
import { AdministradorDeInterfazDeChat } from "../batalla/administradorDeInterfazChat.js"
import { AdministradorDeOrdenes } from "../batalla/administradorDeOrdenes.js";
import { AdministradorDeInterfazDeBatalla } from "../batalla/administradorDeInterfazDeBatalla.js";
import { AdministradorDeEventosDeBatalla } from "../batalla/administradorDeEventosDeBatalla.js";
import { AdministradorDeListenersDeElementosHTML } from "../batalla/listeners.js";
import {
    obtenerRolDeBatallaDeUsuario,
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
        //la batalla entra en estado de 'pausa' hasta que el pokemon vencido sea cambiado
        AdministradorDeListenersDeElementosHTML.desactivarListenersDeAccionesDeBatalla();
        let rol = respuesta.rol;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        
        if (!entrenador.tienePokemonsVivos) {
            AdministradorDeEventosDeBatalla.notificarFinalizacionDeBatalla();
        }

        if (rol === obtenerRolDeBatallaDeUsuario()) {
            let entrenador = batalla.obtenerEntrenadorPorRol(rol);

            entrenador.equipo.pokemons.forEach(pokemon => {
                if (pokemon.vivo) {
                    let imagen = pokemon.obtenerImagen();
                    AdministradorDeInterfazDeBatalla.iniciarAnimacionDePulso(imagen);
                    imagen.addEventListener("click", event => { AdministradorDeEventosDeBatalla.notificarCambioForzado(event, entrenador) });
                }
            });
        }
    }

    if (respuesta.type === 'notificacionDeCambioForzado') {
        let rol = respuesta.rol;
        let indicePokemonVencido = respuesta.indicePokemonVencido;
        let indicePokemonEntrante = respuesta.indicePokemonEntrante;
        let entrenadorParaCambioForzado = batalla.obtenerEntrenadorPorRol(rol);
        let pokemonVencido = entrenadorParaCambioForzado.equipo.pokemons[indicePokemonVencido];

        AdministradorDeEventosDeBatalla.ejecutarCambioForzadoPorMuerte(entrenadorParaCambioForzado, indicePokemonEntrante);
        AdministradorDeInterfazDeBatalla.terminarAnimacionesDePulsoDeEquipo(entrenadorParaCambioForzado);
        AdministradorDeListenersDeElementosHTML.quitarListenerDeClickAElemento(pokemonVencido.obtenerImagen());
        AdministradorDeListenersDeElementosHTML.activarListenersDeAccionesDeBatalla();
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

    websocket.send(mensajeJSON);

    formularioParaEnviarMensajeAServidor.reset();
}


let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");

//(1) INPUT
formularioParaEnviarMensajeAServidor.addEventListener('submit', enviarMensajeDeUsuarioViaWebsocket);

//(4) OUTPUT
websocket.onmessage = manejarMensajeDeServidor; //handler para evento websocket 'message'