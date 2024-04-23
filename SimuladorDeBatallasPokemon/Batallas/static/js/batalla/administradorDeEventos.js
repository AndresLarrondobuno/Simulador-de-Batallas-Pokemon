import { csrftoken, enviarMensajeAConsumidor, mensajeEnviadoAConsumidorConExito } from "../../../static/js/funcionesAuxiliares.js";
import { websocket } from "../conexionesWebsocket/iniciarConexionWs.js";
import { batalla } from "./main.js";

class AdministradorDeEventosDOM {

    static async guardarEleccionDeAccionDeBatalla(event) {
        event.preventDefault();

        let url = "/batallas/guardar_eleccion_de_accion_de_batalla/";
        let idBatalla = document.getElementById("tituloBatalla").dataset.id;
        let rolUsuario = document.getElementById("tituloBatalla").dataset.rolUsuario;
        let idBoton = event.target.id;

        if (idBoton.includes('botonMovimiento')) {
            var informacionDeOrden = AdministradorDeEventosDOM.obtenerInformacionDeMovimiento(event);
        }
        else {
            var informacionDeOrden = AdministradorDeEventosDOM.obtenerInformacionDeCambioDePokemon(event);

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

            if (entrenadorSolicitanteEligioAccion && entrenadorDestinatarioEligioAccion) {
                console.log("Ambos entrenadores eligieron accion.");
                let datosElecciones = {
                    "message": respuestaJson,
                    "type": "actualizacionDeEstadoDeBatalla",
                }
                await enviarMensajeAConsumidor(websocket, datosElecciones, mensajeEnviadoAConsumidorConExito);
            }
        }
        else {
            console.log("entrenadorSolicitanteEligioAccion: ", entrenadorSolicitanteEligioAccion);
            console.log("entrenadorDestinatarioEligioAccion: ", entrenadorDestinatarioEligioAccion);
        }
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

export { AdministradorDeEventosDOM };