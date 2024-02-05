import {crearBoton, eliminarElementosHijos} from "./funcionesAuxiliares.js";
import {
    buscarPokemonPorSubstring, 
    buscarEspecie, 
    buscarMovimientoPorSubstring, 
    guardarEquipo
} from "./solicitudesAJAX.js";


class Equipo {
    constructor(nombre='', integrantes=[]) {
        this._nombre = nombre;
        this._integrantes = integrantes;
        this._tamano = 2;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    get nombre() {
        return this._nombre
    }

    get integrantes() {
        return this._integrantes
    }

    get tamano() {
        return this._tamano
    }

    
    agregarPokemon(pokemon) {
        this.integrantes.push(pokemon);
    }


    equipoCompleto() {
        return this.integrantes.length === this.tamano;
    }


    equipoVacio() {
        return this.integrantes.length === 0;
    }


    equipoEsValido() {
        const todosTienenCuatroMovimientos = this.integrantes.every(pokemon => {
            return pokemon.movimientos.length === 4;
        });
    
        const todosTienenMovimientosValidos = this.integrantes.every(pokemon => {
            return pokemon.movimientosSonValidos(pokemon.movimientos);
        });
        
        const tamanoValido = this.equipoCompleto();
    
        console.log( tamanoValido + " // " + todosTienenCuatroMovimientos + " // " + todosTienenMovimientosValidos);
    
        return tamanoValido && todosTienenCuatroMovimientos && todosTienenMovimientosValidos 
    }


    toString() {
        return `${this.nombre}( ${this.integrantes.length} )`;
    }
}


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


    movimientosSonValidos() {
        let sonValidos = this.movimientos.every(movimiento => {
            return movimiento !== '';
        });
        return sonValidos
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
    contenedorSeleccionDeMovimientos.setAttribute("id", "contenedorSeleccionDeMovimientos")
    contenedorSeleccionDeMovimientos.classList.add("contenedorConFondo1")

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
    contenedorMovimientos.classList.add("contenedor");

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