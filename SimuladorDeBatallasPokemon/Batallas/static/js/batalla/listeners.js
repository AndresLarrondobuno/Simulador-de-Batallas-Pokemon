import { AdministradorDeEventos } from "./administradorDeEventos.js"
import { batalla } from "./main.js";

let datosEquipo = document.getElementById("contenedorBatalla").dataset.equipo;
datosEquipo = JSON.parse(datosEquipo);
let datosMovimientosPokemonLider = datosEquipo[0]['movimientos'];

let contenedorMovimientos = document.getElementById("contenedorMovimientos");

let botonMovimientoUno = document.createElement("button");
let botonMovimientoDos = document.createElement("button");
let botonMovimientoTres = document.createElement("button");
let botonMovimientoCuatro = document.createElement("button");


let imagenPokemonSolicitanteSlotUno = document.getElementById("imagenPokemonSolicitanteSlot0");
let imagenPokemonSolicitanteSlotDos = document.getElementById("imagenPokemonSolicitanteSlot1");
let imagenPokemonDestinatarioSlotUno = document.getElementById("imagenPokemonDestinatarioSlot0");
let imagenPokemonDestinatarioSlotDos = document.getElementById("imagenPokemonDestinatarioSlot1");


let imagenesPokemonsParaCambio = [
    imagenPokemonSolicitanteSlotUno, 
    imagenPokemonSolicitanteSlotDos,
    imagenPokemonDestinatarioSlotUno,
    imagenPokemonDestinatarioSlotDos
]

let botonesMovimientos = [
    botonMovimientoUno,
    botonMovimientoDos,
    botonMovimientoTres,
    botonMovimientoCuatro
]

let i = 0;
botonesMovimientos.forEach(boton => {
    boton.id = `botonMovimiento${i}`;
    boton.classList.add("botonAccion");
    contenedorMovimientos.appendChild(boton);
    i = i + 1;
});

//asigna los nombres de los movimientos a los botones
botonesMovimientos.map((elemento, indice) => {
    let datosMovimiento = datosMovimientosPokemonLider[indice];
    let nombreMovimiento = datosMovimiento['nombre'];
    elemento.textContent = nombreMovimiento;
});

//concatena el boton de cambio a los de movimientos
let listeners = botonesMovimientos.concat([...imagenesPokemonsParaCambio]);

//listeners que comunican al servidor la accion elegida por los usuarios
listeners.forEach(elemento => {
    elemento.addEventListener('click', AdministradorDeEventos.guardarEleccionDeAccionDeBatalla);
});

window.addEventListener("turnoListoParaEjecutarse", batalla.ejecutarTurno.bind(batalla));