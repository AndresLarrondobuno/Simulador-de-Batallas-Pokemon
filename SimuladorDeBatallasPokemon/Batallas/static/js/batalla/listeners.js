import { AdministradorDeEventosDeBatalla } from "./administradorDeEventosDeBatalla.js";
import { obtenerRolDeBatallaDeUsuario } from "../../../static/js/funcionesAuxiliares.js";

let rolUsuario = obtenerRolDeBatallaDeUsuario();
let datosEquipo = document.getElementById("contenedorBatalla").dataset.equipo;
datosEquipo = JSON.parse(datosEquipo);
let datosMovimientosPokemonLider = datosEquipo[0]['movimientos'];

let contenedorMovimientos = document.getElementById("contenedorMovimientos");

let botonMovimientoUno = document.createElement("button");
let botonMovimientoDos = document.createElement("button");
let botonMovimientoTres = document.createElement("button");
let botonMovimientoCuatro = document.createElement("button");


let imagenesPokemonsParaCambio = [];

if (rolUsuario === 'solicitante') {
    let imagenPokemonSolicitanteSlotUno = document.getElementById("imagenPokemonSolicitanteSlot0");
    let imagenPokemonSolicitanteSlotDos = document.getElementById("imagenPokemonSolicitanteSlot1");
    imagenesPokemonsParaCambio.push(imagenPokemonSolicitanteSlotUno, imagenPokemonSolicitanteSlotDos);
}
else {
    let imagenPokemonDestinatarioSlotUno = document.getElementById("imagenPokemonDestinatarioSlot0");
    let imagenPokemonDestinatarioSlotDos = document.getElementById("imagenPokemonDestinatarioSlot1");
    imagenesPokemonsParaCambio.push(imagenPokemonDestinatarioSlotUno, imagenPokemonDestinatarioSlotDos);
}

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
let elementosConListenerParaEleccionVoluntariaDeUsuario = botonesMovimientos.concat([...imagenesPokemonsParaCambio]);

//asigna listeners que comunican al servidor la accion elegida por los usuarios
elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
    elemento.addEventListener('click', AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
});


class AdministradorDeListenersDeElementosHTML {

    static desactivarListenersDeAccionesDeBatalla() {
        elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.removeEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }


    static activarListenersDeAccionesDeBatalla() {
        elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.addEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }


    static quitarListenerDeClickAElemento(elementoHtml) {
        elementoHtml.removeEventListener('click', AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
    }
}



export { elementosConListenerParaEleccionVoluntariaDeUsuario, AdministradorDeListenersDeElementosHTML };