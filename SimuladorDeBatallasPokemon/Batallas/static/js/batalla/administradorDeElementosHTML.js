import { AdministradorDeEventosDeBatalla } from "./administradorDeEventosDeBatalla.js";
import { obtenerRolDeBatallaDeUsuario, obtenerPokemonAPartirDeIdDeImagen } from "../../../static/js/funcionesAuxiliares.js";
import { batalla } from "./main.js";

class AdministradorDeElementosHTML {

    constructor() {

        this._rol = obtenerRolDeBatallaDeUsuario();

        let botonMovimientoUno = document.createElement("button");
        let botonMovimientoDos = document.createElement("button");
        let botonMovimientoTres = document.createElement("button");
        let botonMovimientoCuatro = document.createElement("button");

        this._botonesMovimientos = [
            botonMovimientoUno,
            botonMovimientoDos,
            botonMovimientoTres,
            botonMovimientoCuatro
        ]

        this._imagenesDePokemonsParaCambio = []

        this.setImagenesDePokemonsParaCambio();
        this.asignarIdsABotonesDeMovimientos();
        this.asignarNombresABotonesDeMovimientos();
        this._elementosConListenerParaEleccionVoluntariaDeUsuario = this.botonesMovimientos.concat([...this._imagenesDePokemonsParaCambio]);
        this.asignarListeners();
    }


    get rol() {
        return this._rol
    }


    get botonesMovimientos() {
        return this._botonesMovimientos
    }


    get imagenesDePokemonsParaCambio() {
        return this._imagenesDePokemonsParaCambio
    }


    get elementosConListenerParaEleccionVoluntariaDeUsuario() {
        return this._elementosConListenerParaEleccionVoluntariaDeUsuario
    }


    setImagenesDePokemonsParaCambio() {
        if (this._rol === 'solicitante') {
            var imagenPokemonSlotUno = document.getElementById("imagenPokemonSolicitanteSlot0");
            var imagenPokemonSlotDos = document.getElementById("imagenPokemonSolicitanteSlot1");
        }
        else {
            var imagenPokemonSlotUno = document.getElementById("imagenPokemonDestinatarioSlot0");
            var imagenPokemonSlotDos = document.getElementById("imagenPokemonDestinatarioSlot1");
        }
        this._imagenesDePokemonsParaCambio.push(imagenPokemonSlotUno, imagenPokemonSlotDos);
    }


    asignarIdsABotonesDeMovimientos() {
        let contenedorMovimientos = document.getElementById("contenedorMovimientos");

        let i = 0;
        this.botonesMovimientos.forEach(boton => {
            boton.id = `botonMovimiento${i}`;
            boton.classList.add("botonAccion");
            contenedorMovimientos.appendChild(boton);
            i = i + 1;
        });
    }

    asignarNombresABotonesDeMovimientos() {
        let datosEquipo = document.getElementById("contenedorBatalla").dataset.equipo;
        datosEquipo = JSON.parse(datosEquipo);
        let datosMovimientosPokemonLider = datosEquipo[0]['movimientos'];

        this.botonesMovimientos.map((elemento, indice) => {
            let nombreMovimiento = datosMovimientosPokemonLider[indice]['nombre'];
            elemento.textContent = nombreMovimiento;
        });
    }


    asignarListeners() {
        this.elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.addEventListener('click', AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }


    desactivarListenersDeAccionesDeBatalla() {
        this.elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.removeEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }


    activarListenersDeAccionesDeBatalla() {
        this.elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            let elementoRequiereListener = true;

            if (elemento.tagName === 'IMG') {
                let pokemon = obtenerPokemonAPartirDeIdDeImagen(batalla, elemento.id);
                if (!pokemon.vivo) {
                    elementoRequiereListener = false;
                }
            }

            if (elementoRequiereListener) {
                elemento.addEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
            }    
        });
    }


    quitarListenerDeClickAElemento(elementoHtml) {
        elementoHtml.removeEventListener('click', AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
    }
}

let administradorDeElementosHTML = new AdministradorDeElementosHTML();

export { administradorDeElementosHTML };