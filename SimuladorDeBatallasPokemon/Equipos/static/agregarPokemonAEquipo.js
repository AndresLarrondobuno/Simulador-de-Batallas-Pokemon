import {crearBoton, eliminarElementosHijos} from "./funcionesAuxiliares.js";
import {buscarPokemonPorSubstring, buscarMovimientoPorSubstring, guardarEquipo} from "./solicitudesAJAX.js";

var equipo = [];
const tamano = 2;


class Pokemon {
    constructor(nombre, movimientos=[]) {
        this._nombre = nombre;
        this._movimientos = movimientos;
    }

    agregarMovimiento(movimiento) {
        if ( this._movimientos.length < 4 && movimiento) {
            this._movimientos.push(movimiento);
        }
        else {
            console.log("Solo podes elegir hasta 4 movimientos.")
        }
    }

    agregarMovimientos(movimientos) {
        movimientos.forEach((movimiento) => this.agregarMovimiento(movimiento));
    }

    get nombre() {
        return this._nombre
    }

    get movimientos() {
        return this._movimientos
    }

    toString() {
        return `${this.nombre}( ${this.movimientos.length} )`;
      }
}


function agregarPokemonAEquipo() {
    var nombreDePokemon = selectOpcionesPokemon.value;
    var equipoInCompleto = equipo.length < tamano;

    if (equipoInCompleto) {
        if (nombreDePokemon) {
            var pokemon = new Pokemon(nombreDePokemon);
            equipo.push(pokemon);
            crearSeccionAgregarMovimientos(pokemon);
        }
    }
    else {
        console.log("tu equipo ya esta completo.");
        console.log(equipo);
    }
    eliminarElementosHijos(selectOpcionesPokemon);
}


function crearSeccionAgregarMovimientos(pokemon) {
    var contenedorSeleccionDePokemons = document.getElementById("contenedorSeleccionDePokemons");
    var contenedorSeleccionDeMovimientos = document.createElement("div");
    var h4NombreDePokemon = document.createElement("h4");
    h4NombreDePokemon.appendChild(document.createTextNode(pokemon.nombre));
    var inputMovimiento = document.createElement("input");
    var selectMovimiento = document.createElement("select");
    var botonAgregarMovimiento = crearBoton("Agregar Movimiento");
    var elementos = [h4NombreDePokemon, inputMovimiento, selectMovimiento, botonAgregarMovimiento]

    var contenedorMovimientos = document.createElement("div");
    var listaDeMovimientos = document.createElement("ol");
    contenedorMovimientos.appendChild(listaDeMovimientos);

    
    contenedorSeleccionDePokemons.appendChild(contenedorSeleccionDeMovimientos);
    contenedorSeleccionDeMovimientos.append(...elementos);
    contenedorSeleccionDeMovimientos.appendChild(contenedorMovimientos);
    

    inputMovimiento.addEventListener("input", buscarMovimientoPorSubstring);
    botonAgregarMovimiento.addEventListener("click", (event) => {agregarMovimientoAPokemon(event, pokemon)});
}


function agregarMovimientoAPokemon(event, pokemon) {
    var contenedorMovimientos = event.target.parentElement;
    var nombreMovimiento = event.target.previousElementSibling.value;
    
    var listaDeMovimientos = contenedorMovimientos.querySelector('ol');
    var cantidadDeMovimientos = listaDeMovimientos.children.length;

    if (cantidadDeMovimientos < 4 && nombreMovimiento) {
        var liMovimiento = document.createElement("li");
        liMovimiento.textContent = nombreMovimiento;
        listaDeMovimientos.appendChild(liMovimiento);
        pokemon.agregarMovimiento(nombreMovimiento);
    }
    else {
        console.log("Estas intentando agregar mas movimientos de lo permitido o el movimiento no es valido.");
    }
}

var body = document.getElementById("cuerpo");
var inputBusquedaPokemon = document.getElementById("busquedaPokemon");
var selectOpcionesPokemon = document.getElementById("opcionesPokemon");
var botonAgregarPokemon = document.getElementById("agregarPokemon");
var botonGuardarEquipo = document.getElementById("botonGuardarEquipo");

var contenedorSeleccionDePokemons = document.createElement("div");
contenedorSeleccionDePokemons.setAttribute("id", "contenedorSeleccionDePokemons");
body.insertBefore(contenedorSeleccionDePokemons, null);

botonAgregarPokemon.addEventListener("click", agregarPokemonAEquipo);
inputBusquedaPokemon.addEventListener("input", buscarPokemonPorSubstring);
botonGuardarEquipo.addEventListener("click", (event) => {guardarEquipo(event, equipo)});