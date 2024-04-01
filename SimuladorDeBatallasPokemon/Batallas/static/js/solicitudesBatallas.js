console.log("leyendo script solicitudesBatallas");
import {
    csrftoken,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda, 
    eliminarElementosHijos,
} 
from "../../../static/js/funcionesAuxiliares.js";

async function buscarUsuarioPorSubstring() {
    console.log("buscarUsuarioPorSubstring");
    let busqueda = this.value;
    let elementoSelect = this.nextElementSibling;
    let url = `/usuarios/buscarNombresDeUsuario/?busqueda=${busqueda}`;

    const respuesta = await fetch(url);
    const resultados = await respuesta.json();

    console.log(resultados);

    if (!resultados.ok) {
        await eliminarElementosHijos(elementoSelect);
        await agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
    }
}


async function invitarABatalla(event) {
    event.preventDefault();

    let contenedorEquipoSeleccionado = document.getElementById("equipoSeleccionado");
    let selectNombreOponente = document.getElementById("opcionesUsuarios");


    let oponenteFueSeleccionado = selectNombreOponente.selectedIndex >= 0;
    let equipoFueSeleccionado = contenedorEquipoSeleccionado;

    if (equipoFueSeleccionado && oponenteFueSeleccionado) {
        let indiceNombreSeleccionado = selectNombreOponente.selectedIndex;
        let nombreOponente = selectNombreOponente[indiceNombreSeleccionado].textContent;
    
        let datos = {
            "nombreOponente" : nombreOponente,
            "idEquipoSolicitante" : contenedorEquipoSeleccionado.dataset.equipoId,
        };

        let jsonDatos = JSON.stringify(datos);

        let url = `/batallas/crear_invitacion_a_batalla/`;

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        }

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: jsonDatos,
        });


        if (respuesta.ok) {
            console.log("invitacion enviada al servidor...");
            window.location.href = "/";
        }
    }
    else {
        if (!oponenteFueSeleccionado){
            console.log("No seleccionaste un oponente.")
        }
        if (!equipoFueSeleccionado){
            console.log("No seleccionaste un equipo.")
        }
    }

}

let inputNombreOponente = document.getElementById("nombreOponente");
let formularioDeBusquedaDeOponente = document.getElementById("formularioBuscarOponente");
formularioDeBusquedaDeOponente.addEventListener("submit", invitarABatalla);
inputNombreOponente.addEventListener("input", buscarUsuarioPorSubstring);