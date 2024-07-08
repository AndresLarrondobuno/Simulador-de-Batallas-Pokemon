import { batalla } from "../batalla/main.js";
import { websocket } from "./administradorDeConexionWebsocket.js";
import { AdministradorDeInterfazDeChat } from "../batalla/administradorDeInterfazChat.js"
import { AdministradorDeOrdenes } from "../batalla/administradorDeOrdenes.js";
import { AdministradorDeInterfazDeBatalla } from "../batalla/administradorDeInterfazDeBatalla.js";
import { AdministradorDeEventosDeBatalla } from "../batalla/administradorDeEventosDeBatalla.js";
import { administradorDeElementosHTML } from "../batalla/administradorDeElementosHTML.js";
import {
    obtenerRolDeBatallaDeUsuario,
} from "../../../static/js/funcionesAuxiliares.js";


class AdministradorDeMensajesWebsocket {

    static manejarMensajeWebsocketDeServidor(evento) {

        let respuesta = JSON.parse(evento.data);

        if (respuesta.type === 'mensajeDeUsuario') {
            AdministradorDeMensajesWebsocket.manejarMensajeDeUsuario(respuesta);
        }

        if (respuesta.type === 'relatoDeAccionDeBatalla') {
            AdministradorDeMensajesWebsocket.manejarRelatoDeAccionDeBatalla(respuesta);
        }

        if (respuesta.type === 'actualizacionDeEstadoDeBatalla') {
            AdministradorDeMensajesWebsocket.manejarActualizacionDeEstadoDeBatalla(respuesta);
        }

        if (respuesta.type === 'actualizacionDeImagenDePokemonEnCombate') {
            AdministradorDeMensajesWebsocket.manejarActualizacionDeImagenDePokemonEnCombate(respuesta);
        }

        if (respuesta.type === 'actualizacionDeBotonesDeMovimientos') {
            AdministradorDeMensajesWebsocket.manejarActualizacionDeBotonesDeMovimientos(respuesta);
        }

        if (respuesta.type === 'notificacionDeMuerteDePokemon') {
            AdministradorDeMensajesWebsocket.manejarNotificacionDeMuerteDePokemon(respuesta);
        }

        if (respuesta.type === 'notificacionDeCambioForzado') {
            AdministradorDeMensajesWebsocket.manejarNotificacionDeCambioForzado(respuesta);
        }

        if (respuesta.type === 'notificacionDeFinalDeBatalla') {
            AdministradorDeMensajesWebsocket.manejarNotificacionDeFinalDeBatalla(respuesta);
        }
    }


    static manejarMensajeDeUsuario(respuesta) {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirMensajeDeUsuario(mensaje);
    }


    static manejarRelatoDeAccionDeBatalla(respuesta) {
        let mensaje = respuesta.message;
        AdministradorDeInterfazDeChat.imprimirRelatoDeAccionDeBatalla(mensaje);
    }


    static manejarActualizacionDeEstadoDeBatalla(respuesta) {
        let datosBatallaActualizados = respuesta.message;
        AdministradorDeOrdenes.asignarOrdenes(batalla, datosBatallaActualizados);
        AdministradorDeEventosDeBatalla.ejecutarTurno();
        AdministradorDeEventosDeBatalla.siguienteTurno();
    }


    static manejarActualizacionDeImagenDePokemonEnCombate(respuesta) {
        let rol = respuesta.message;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);
    }


    static manejarActualizacionDeBotonesDeMovimientos(respuesta) {
        let rol = respuesta.message.rol;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);
        AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
    }


    static manejarNotificacionDeMuerteDePokemon(respuesta) {
        //la batalla entra en estado de 'pausa' hasta que el pokemon vencido sea cambiado
        administradorDeElementosHTML.desactivarListenersDeAccionesDeBatalla();
        let rol = respuesta.rol;
        let entrenador = batalla.obtenerEntrenadorPorRol(rol);

        if (entrenador.noPoseePokemonsVivos()) {
            AdministradorDeEventosDeBatalla.notificarFinalizacionDeBatalla(batalla.obtenerOponente(entrenador));
        }

        if (rol === obtenerRolDeBatallaDeUsuario(respuesta)) {
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


    static manejarNotificacionDeCambioForzado(respuesta) {
        let rol = respuesta.rol;
        let indicePokemonVencido = respuesta.indicePokemonVencido;
        let indicePokemonEntrante = respuesta.indicePokemonEntrante;
        let entrenadorParaCambioForzado = batalla.obtenerEntrenadorPorRol(rol);
        let pokemonVencido = entrenadorParaCambioForzado.equipo.pokemons[indicePokemonVencido];

        AdministradorDeEventosDeBatalla.ejecutarCambioForzadoPorMuerte(entrenadorParaCambioForzado, indicePokemonEntrante);
        AdministradorDeInterfazDeBatalla.terminarAnimacionesDePulsoDeEquipo(entrenadorParaCambioForzado);
        administradorDeElementosHTML.quitarListenerDeClickAElemento(pokemonVencido.obtenerImagen());
        administradorDeElementosHTML.activarListenersDeAccionesDeBatalla();
    }


    static manejarNotificacionDeFinalDeBatalla(respuesta) {
        let rolEntrenadorGanador = respuesta.rolEntrenadorGanador;
        console.log("FIN de la batalla, el ganador es: ", rolEntrenadorGanador);
        administradorDeElementosHTML.desactivarListenersDeAccionesDeBatalla();
    }


    static enviarMensajeDeUsuarioViaWebsocket(event) {
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


    static agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor() {
        let formularioParaEnviarMensajeAServidor = document.getElementById("formularioParaEnviarMensajeAServidor");
        formularioParaEnviarMensajeAServidor.addEventListener('submit', AdministradorDeMensajesWebsocket.enviarMensajeDeUsuarioViaWebsocket);
    }
}

AdministradorDeMensajesWebsocket.agregarListenerAFormularioParaEnvioDeMensajesWebsocketAServidor();
websocket.onmessage = AdministradorDeMensajesWebsocket.manejarMensajeWebsocketDeServidor;

export { AdministradorDeMensajesWebsocket };