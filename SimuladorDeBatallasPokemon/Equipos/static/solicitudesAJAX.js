import {csrftoken,
agregarOpcionesASelectAPartirDeResultadosDeBusqueda,
eliminarElementosHijos
} from "./funcionesAuxiliares.js";


async function buscarPokemonPorSubstring() {
    let busqueda = this.value;
    let elementoSelect = this.nextElementSibling;
    let url = `/equipos/buscarNombresDePokemons/?busqueda=${busqueda}`;

    const respuesta = await fetch(url);
    const resultados = await respuesta.json();

    if (!resultados.ok) {
        await eliminarElementosHijos(elementoSelect);
        await agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
    }
}


async function buscarMovimientoPorSubstring() {
    let busqueda = this.value.trim();
    let nombreDePokemon = this.previousElementSibling.textContent.trim();
    let elementoSelect = this.nextElementSibling;

    let url = `/equipos/buscarNombresDeMovimientos/?busqueda=${busqueda}&nombrePokemon=${nombreDePokemon}`;

    const respuesta = await fetch(url);

    const resultados = await respuesta.json();

    if (!resultados.ok) {
        await eliminarElementosHijos(elementoSelect);

        await agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
    }
}


async function buscarEspecie(nombrePokemon) {
    let url = `/pokemons/buscarEspecie/?nombrePokemon=${nombrePokemon}`;

    const respuesta = await fetch(url);

    const resultados = await respuesta.json();

    if (!resultados.ok) {
        return resultados
    }
}


async function guardarEquipo(event, equipo) {
    event.preventDefault();

    let equipoValido = equipo.equipoEsValido();
    equipo.nombre = document.getElementById("eleccionDeNombreDeEquipo").value;
    

    if (equipoValido) {
        let url = "/equipos/crearEquipo/";

        let primerPokemon = equipo.integrantes[0];
        let segundoPokemon = equipo.integrantes[1];
        
        let datos = {
            "nombre": equipo.nombre,
            "primerPokemon": {"nombre":primerPokemon.nombre, "movimientos":primerPokemon.movimientos},
            "segundoPokemon": {"nombre":segundoPokemon.nombre, "movimientos":segundoPokemon.movimientos}
        };

        let jsonDatos = JSON.stringify(datos);

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        };

        const respuesta = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: jsonDatos
        })

        if (respuesta.ok) {
            console.log("Tu equipo fue creado con exito!");
            console.log("Equipo: " + equipo);
            console.log("Datos enviados a servidor: " + jsonDatos);
            window.location.href = '/equipos/'; //se encarga de la redireccion del lado del cliente
        } else {
            console.log("Hubo un error en la solicitud.");
        }
    }    
    else {
        console.log("El equipo no es válido.");
    }

}


export {buscarPokemonPorSubstring, buscarEspecie, buscarMovimientoPorSubstring, guardarEquipo};