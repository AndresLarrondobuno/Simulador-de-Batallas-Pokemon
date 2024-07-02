import { obtenerIdDeBatalla } from "../../../static/js/funcionesAuxiliares.js";

class Batalla {
    constructor(entrenadorSolicitante, entrenadorDestinatario) {
        this._entrenadores = {
            "entrenadorSolicitante": entrenadorSolicitante,
            "entrenadorDestinatario": entrenadorDestinatario,
        }

        entrenadorSolicitante.batalla = this;
        entrenadorDestinatario.batalla = this;

        this._turnoActual = 1;
        this._id = obtenerIdDeBatalla();
    }


    get id() {
        return this._id
    }


    get turnoActual() {
        return this._turnoActual
    }


    get entrenadores() {
        return this._entrenadores
    }


    obtenerEntrenadorPorRol(rol) {
        if (rol === 'solicitante') {
            return this._entrenadores["entrenadorSolicitante"]
        }
        if (rol === 'destinatario') {
            return this._entrenadores["entrenadorDestinatario"]
        }
        else {
            console.log(`rol invalido: ${rol}`);
        }
    }


    obtenerEntrenadorParaCambioForzado() {
        let arrayEntrenadores = Object.values(this.entrenadores);
        return arrayEntrenadores.find(entrenador => !entrenador.pokemonEnCombate.vivo);
    }


    obtenerOponente(entrenador) {
        if (entrenador.rol === 'solicitante') {
            return this.entrenadores["entrenadorDestinatario"]
        }
        else {
            return this.entrenadores["entrenadorSolicitante"]
        }
    }


    obtenerOrdenDeEjecucionPorPrioridad() {
        let arrayEntrenadores = Object.values(this.entrenadores);
        let arrayOrdenadoAscendente = arrayEntrenadores.toSorted((a, b) => a.orden.prioridad - b.orden.prioridad);
        return arrayOrdenadoAscendente.toReversed();
    }


    obtenerOrdenDeEjecucionPorVelocidad() {
        let arrayEntrenadores = Object.values(this.entrenadores);
        let arrayOrdenadoAscendente = arrayEntrenadores.toSorted((a, b) => a.pokemonEnCombate.velocidad - b.pokemonEnCombate.velocidad);
        return arrayOrdenadoAscendente.toReversed();
    }


    ambasOrdenesSonDeAtaque() {
        let arrayEntrenadores = Object.values(this.entrenadores);
        return arrayEntrenadores.every(entrenador => entrenador.orden.constructor.name === 'OrdenDeAtaque');
    }



    pokemonFueVencido() {
        let arrayEntrenadores = Object.values(this.entrenadores);
        return arrayEntrenadores.some(entrenador => !entrenador.pokemonEnCombate.vivo);
    }

}

export { Batalla };