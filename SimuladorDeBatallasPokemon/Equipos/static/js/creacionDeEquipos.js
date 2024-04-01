import {
    crearBoton,
    eliminarElementosHijos,
}
from "../../../static/js/funcionesAuxiliares.js";

import {
    buscarPokemonPorSubstring, 
    buscarEspecie,
    buscarMovimientoPorSubstring, 
    guardarEquipo,
}
from "./solicitudesEquipos.js";

import { Pokemon } from "./pokemon.js";
import { Equipo } from "./equipo.js";


function agregarPokemonAEquipo() {
    let nombreDePokemon = selectOpcionesPokemon.value;

    if (!equipo.equipoCompleto()) {
        if (nombreDePokemon) {
            let pokemon = new Pokemon(nombreDePokemon);
            equipo.agregarPokemon(pokemon);
            crearSeccionAgregarMovimientos(pokemon);
        }
    }
    else {
        console.log("tu equipo ya esta completo.");
        console.log("equipo: ", equipo);
    }
    eliminarElementosHijos(selectOpcionesPokemon);
}


async function crearSeccionAgregarMovimientos(pokemon) {
    let contenedorSeleccionDeMovimientos = document.createElement("div");
    contenedorSeleccionDeMovimientos.classList.add("contenedorAnchoMediano", "fondo1");

    let nombrePokemon = document.createElement("h5");
    nombrePokemon.setAttribute("id", "nombreDePokemonParaBusquedaDeMovimiento");
    nombrePokemon.innerHTML = (pokemon.nombre);

    let inputMovimiento = document.createElement("input");
    inputMovimiento.setAttribute("id", "inputMovimiento");

    let selectMovimiento = document.createElement("select");
    selectMovimiento.setAttribute("id", "selectMovimiento");

    let botonAgregarMovimiento = crearBoton("Agregar Movimiento");
    
    let contenedorMovimientos = document.createElement("div");
    contenedorMovimientos.setAttribute("id", "contenedorMovimientos");
    contenedorMovimientos.classList.add("container");

    let listaDeMovimientos = document.createElement("ol");
    contenedorMovimientos.appendChild(listaDeMovimientos);

    let respuesta = await buscarEspecie(pokemon.nombre);
    let icono  = document.createElement("img");
    icono.setAttribute("src", `data:image/png;base64,${respuesta}`);

    let elementos = [
        icono, 
        nombrePokemon, 
        inputMovimiento,
        selectMovimiento,
        botonAgregarMovimiento,
        contenedorMovimientos]

    contenedorSeleccionDeMovimientos.append(...elementos);

    body.appendChild(contenedorSeleccionDeMovimientos);

    inputMovimiento.addEventListener("input", buscarMovimientoPorSubstring);
    botonAgregarMovimiento.addEventListener("click", (event) => {agregarMovimientoAPokemon(event, pokemon)});

}


function agregarMovimientoAPokemon(event, pokemon) {
    let contenedorMovimientos = event.target.parentElement;
    let nombreMovimiento = event.target.previousElementSibling.value;
    
    let listaDeMovimientos = contenedorMovimientos.querySelector('ol');
    let cantidadDeMovimientos = listaDeMovimientos.children.length;

    if (cantidadDeMovimientos < 4 && nombreMovimiento) {
        let liMovimiento = document.createElement("li");
        liMovimiento.textContent = nombreMovimiento;
        listaDeMovimientos.appendChild(liMovimiento);
        pokemon.agregarMovimiento(nombreMovimiento);
    }
    else {
        console.log("Estas intentando agregar mas movimientos de lo permitido o el movimiento no es valido.");
    }
}

let equipo = new Equipo();

let body = document.getElementById("cuerpo");
let inputBusquedaPokemon = document.getElementById("busquedaPokemon");
let selectOpcionesPokemon = document.getElementById("opcionesPokemon");
let botonAgregarPokemon = document.getElementById("agregarPokemon");
let formularioCrearEquipo = document.getElementById('formularioCrearEquipo');

botonAgregarPokemon.addEventListener("click", agregarPokemonAEquipo);
inputBusquedaPokemon.addEventListener("input", buscarPokemonPorSubstring);
formularioCrearEquipo.addEventListener("submit", (event) => {guardarEquipo(event, equipo)});