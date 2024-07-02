import {
    csrftoken,
    enviarMensajeAConsumidor,
    mensajeEnviadoAConsumidorConExito,
    obtenerRolDeBatallaDeUsuario
}
    from "../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeInterfazDeChat } from "./administradorDeInterfazChat.js";
import { AdministradorDeInterfazDeBatalla } from "./administradorDeInterfazDeBatalla.js";
import { AdministradorDeOrdenes } from "./administradorDeOrdenes.js";
import { websocket } from "../conexionesWebsocket/iniciarConexionWs.js";
import { batalla } from "./main.js";

class AdministradorDeEventosDeBatalla {

    static async ejecutarTurno() {
        console.log("ambasOrdenesSonDeAtaque() -> ", batalla.ambasOrdenesSonDeAtaque());

        if (batalla.ambasOrdenesSonDeAtaque()) {
            var entrenadoresOrdenadosParaEjecucion = batalla.obtenerOrdenDeEjecucionPorVelocidad();
        }
        else {
            var entrenadoresOrdenadosParaEjecucion = batalla.obtenerOrdenDeEjecucionPorPrioridad();
        }

        for (const entrenador of entrenadoresOrdenadosParaEjecucion) {
            await entrenador.darOrden();

            AdministradorDeInterfazDeChat.imprimirRelatoDeAccionDeBatalla(entrenador.orden.mensajeDeEjecucion);

            if (entrenador.orden.constructor.name === 'OrdenDeCambioDePokemon') {
                AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);
                let rolUsuario = obtenerRolDeBatallaDeUsuario();

                if (entrenador.rol === rolUsuario) {
                    AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
                }
            }
        }

        let pokemonSolicitante = batalla.entrenadores['entrenadorSolicitante'].pokemonEnCombate;
        let pokemonDestinatario = batalla.entrenadores['entrenadorDestinatario'].pokemonEnCombate;
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida('solicitante', pokemonSolicitante.obtenerVidaRestanteComoPorcentaje());
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida('destinatario', pokemonDestinatario.obtenerVidaRestanteComoPorcentaje());
        console.log(`poke solicitante(restante/total/porcentaje): ${pokemonSolicitante.vida}/ ${pokemonSolicitante.vidaTotal}/ ${pokemonSolicitante.obtenerVidaRestanteComoPorcentaje()}%`);
        console.log(`poke destinatario(restante/total/porcentaje): ${pokemonDestinatario.vida}/${pokemonDestinatario.vidaTotal}/${pokemonDestinatario.obtenerVidaRestanteComoPorcentaje()}%`);
        console.log();
        console.log('///////////////////////////////////////////////');
        console.log();
    }


    static async guardarEleccionDeAccionDeBatalla(event) {
        event.preventDefault();

        let url = "/batallas/guardar_eleccion_de_accion_de_batalla/";
        let idBatalla = batalla.id;
        let rolUsuario = obtenerRolDeBatallaDeUsuario();
        let idBoton = event.target.id;

        if (idBoton.includes('botonMovimiento')) {
            var informacionDeOrden = AdministradorDeEventosDeBatalla.obtenerInformacionDeMovimiento(event);
        }
        else {
            var informacionDeOrden = AdministradorDeEventosDeBatalla.obtenerInformacionDeCambioDePokemon(event);
        }

        let datos = {
            "idBatalla": idBatalla,
            "turnoActual": batalla.turnoActual,
            "rolUsuario": rolUsuario,
            "informacionDeOrden": informacionDeOrden,
        }

        let jsonDatos = JSON.stringify(datos);

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: jsonDatos,
        });

        if (respuesta.ok) {
            console.log("Accion de usuario almacenada correctamente.");

            const respuestaJson = await respuesta.json();

            let entrenadorSolicitanteEligioAccion = respuestaJson['datos_orden_usuario_solicitante'];
            let entrenadorDestinatarioEligioAccion = respuestaJson['datos_orden_usuario_destinatario'];

            console.log("json: ", respuestaJson);

            if (entrenadorSolicitanteEligioAccion && entrenadorDestinatarioEligioAccion) {
                console.log("Ambos entrenadores eligieron accion.");
                AdministradorDeEventosDeBatalla.actualizarEstadoDeBatalla(respuestaJson);

                if (batalla.pokemonFueVencido()) {
                    let entrenadorParaCambioForzado = batalla.obtenerEntrenadorParaCambioForzado();
                    AdministradorDeEventosDeBatalla.notificarMuerteDePokemon(entrenadorParaCambioForzado);
                }
            }
        }
    }


    static ejecutarCambioForzadoPorMuerte(event, entrenador, informacionDeOrden) {
        //obtener informacion de orden, en este caso el indice del pokemon elegido para el cambio
        //asignar orden
        //ejecutar orden
        AdministradorDeEventosDeBatalla.obtenerInformacionDeCambioDePokemon(event);

        AdministradorDeOrdenes.asignarOrden(entrenador, informacionDeOrden);

        entrenador.darOrden();

        AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);

        let rolUsuario = obtenerRolDeBatallaDeUsuario();
        if (entrenador.rol === rolUsuario) {
            AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
        }
    }


    static siguienteTurno() {
        batalla._turnoActual++;
    }


    static async actualizarEstadoDeBatalla(actualizaciones) {
        let datosElecciones = {
            "message": actualizaciones,
            "type": "actualizacionDeEstadoDeBatalla",
        }
        await enviarMensajeAConsumidor(websocket, datosElecciones, mensajeEnviadoAConsumidorConExito);
    }


    static async notificarMuerteDePokemon(entrenador) {
        let datos = {
            "message": entrenador.rol,
            "type": "notificacionDeMuerteDePokemon",
        }
        await enviarMensajeAConsumidor(websocket, datos, mensajeEnviadoAConsumidorConExito);
    }


    static async notificarCambioForzado(entrenador) {
        let datos = {
            "message": entrenador.rol,
            "type": "notificacionDeCambioForzado",
        }
        await enviarMensajeAConsumidor(websocket, datos, mensajeEnviadoAConsumidorConExito);
    }


    static obtenerInformacionDeMovimiento(event) {
        let boton = event.target;
        let id = boton.id;
        let indiceMovimiento = id[id.length - 1]; //accede al ultimo elemento, equivale a id[-1] en python

        let informacionDeOrden = {
            'indiceMovimiento': indiceMovimiento,
            'indicePokemonParaCambio': null,
        };

        return informacionDeOrden
    }


    static obtenerInformacionDeCambioDePokemon(event) {
        let imagen = event.target;
        let id = imagen.id;
        let indiceEnEquipo = id[id.length - 1]; //accede al ultimo elemento, equivale a id[-1] en python

        let informacionDeOrden = {
            'indiceMovimiento': null,
            'indicePokemonParaCambio': indiceEnEquipo,
        };

        return informacionDeOrden
    }

}

export { AdministradorDeEventosDeBatalla };