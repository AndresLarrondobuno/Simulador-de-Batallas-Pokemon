import { csrftoken } from "../../../static/js/funcionesAuxiliares.js";
import { AdministradorDeOrdenes } from "./administradorDeOrdenes.js";
import { batalla } from "./main.js";

class ControladorDeEventos {

    static async guardarEleccionDeAccionDeBatalla(event) {
        event.preventDefault();

        let url = "/batallas/guardar_eleccion_de_accion_de_batalla/";
        let idBatalla = document.getElementById("tituloBatalla").dataset.id;
        let rolUsuario = document.getElementById("tituloBatalla").dataset.rolUsuario;
        let idBoton = event.target.id;

        if (idBoton.includes('botonMovimiento')) {
            var informacionDeOrden = ControladorDeEventos.obtenerInformacionDeMovimiento(event);
        }
        else {
            var informacionDeOrden = ControladorDeEventos.obtenerInformacionDeCambioDePokemon(event);
        }

        let datos = {
            "idBatalla": idBatalla,
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

            let entrenadorSolicitanteEligioAccion = respuestaJson['datos_orden_usuario_solicitante']
            let entrenadorDestinatarioEligioAccion = respuestaJson['datos_orden_usuario_destinatario']

            if (entrenadorSolicitanteEligioAccion && entrenadorDestinatarioEligioAccion) {
                console.log("Ambos entrenadores eligieron accion.");

                AdministradorDeOrdenes.asignarOrdenes(batalla, respuestaJson);
                window.dispatchEvent(turnoListoParaEjecutarse);
            }
        }
        else {
            console.log("entrenadorSolicitanteEligioAccion", entrenadorSolicitanteEligioAccion);
            console.log("entrenadorDestinatarioEligioAccion", entrenadorDestinatarioEligioAccion);
        }

    }


    static actualizarEstadoDeBatalla(batalla) {
        let entrenadorSolicitante = batalla.entrenadores['entrenadorSolicitante'];
        let entrenadorDestinatario = batalla.entrenadores['entrenadorDestinatario'];

        
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
        let textoBoton = event.target.textContent;
        let informacionDeOrden = {
            'indiceMovimiento': null,
            'indicePokemonParaCambio': 1, //valor para testeo
        };
    return informacionDeOrden
}
}

const turnoListoParaEjecutarse = new Event('turnoListoParaEjecutarse');
export { ControladorDeEventos };