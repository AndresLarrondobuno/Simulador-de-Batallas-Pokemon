import { AdministradorDeEventos } from "./administradorDeEventos.js"
import { batalla } from "./main.js";

let datosEquipo = document.getElementById("contenedorBatalla").dataset.equipo;
datosEquipo = JSON.parse(datosEquipo);
let datosMovimientosPokemonLider = datosEquipo[0]['movimientos'];

let contenedorMovimientos = document.getElementById("contenedorMovimientos");
let contenedorCambioDePokemon = document.getElementById("contenedorCambioDePokemon");



let botonMovimientoUno = document.createElement("button");
let botonMovimientoDos = document.createElement("button");
let botonMovimientoTres = document.createElement("button");
let botonMovimientoCuatro = document.createElement("button");
let botonCambioDePokemon = document.createElement("button");

botonCambioDePokemon.textContent = 'Cambiar Pokemon';
contenedorCambioDePokemon.appendChild(botonCambioDePokemon);
botonCambioDePokemon.classList.add('botonAccion');

let botonesMovimientos = [botonMovimientoUno, botonMovimientoDos, botonMovimientoTres, botonMovimientoCuatro]

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
let botones = botonesMovimientos.concat([botonCambioDePokemon]);

//listeners que comunican al servidor la accion elegida por los usuarios
botones.forEach(boton => {
    boton.addEventListener('click', AdministradorDeEventos.guardarEleccionDeAccionDeBatalla);
});

window.addEventListener("turnoListoParaEjecutarse", batalla.ejecutarTurno.bind(batalla));