import { AdministradorDeInterfazDeChat } from "./administradorDeInterfazChat.js";
import { AdministradorDeInterfazDeBatalla } from "./administradorDeInterfazDeBatalla.js";

class Batalla {
    constructor(entrenadorSolicitante, entrenadorDestinatario) {
        this._entrenadores = {
            "entrenadorSolicitante": entrenadorSolicitante,
            "entrenadorDestinatario": entrenadorDestinatario,
        }

        entrenadorSolicitante.batalla = this;
        entrenadorDestinatario.batalla = this;

        this._turnoActual = 1;
        this._id = document.getElementById("tituloBatalla").dataset.id;
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


    siguienteTurno() {
        this._turnoActual++;
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


    async ejecutarTurno() {
        console.log("ambasOrdenesSonDeAtaque() -> ", this.ambasOrdenesSonDeAtaque());

        if (this.ambasOrdenesSonDeAtaque()) {
            var entrenadoresOrdenadosParaEjecucion = this.obtenerOrdenDeEjecucionPorVelocidad();
        }
        else {
            var entrenadoresOrdenadosParaEjecucion = this.obtenerOrdenDeEjecucionPorPrioridad();
        }

        for (const entrenador of entrenadoresOrdenadosParaEjecucion) {
            await entrenador.darOrden();

            AdministradorDeInterfazDeChat.imprimirRelatoDeAccionDeBatalla(entrenador.orden.mensajeDeEjecucion);

            if (entrenador.orden.constructor.name === 'OrdenDeCambioDePokemon') {
                AdministradorDeInterfazDeBatalla.actualizarImagenDePokemonEnCombate(entrenador);
                let rolUsuario = document.getElementById("tituloBatalla").dataset.rolUsuario;

                if (entrenador.rol === rolUsuario) {
                    AdministradorDeInterfazDeBatalla.actualizarBotonesDeMovimientos(entrenador);
                }
            }
        }

        let pokemonSolicitante = this.entrenadores['entrenadorSolicitante'].pokemonEnCombate;
        let pokemonDestinatario = this.entrenadores['entrenadorDestinatario'].pokemonEnCombate;
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida('solicitante', this.entrenadores['entrenadorSolicitante'].pokemonEnCombate.obtenerVidaRestanteComoPorcentaje());
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida('destinatario', this.entrenadores['entrenadorDestinatario'].pokemonEnCombate.obtenerVidaRestanteComoPorcentaje());
        this.siguienteTurno();
        console.log(`poke solicitante(restante/total/porcentaje): ${pokemonSolicitante.vida}/${pokemonSolicitante.vidaTotal}/${pokemonSolicitante.obtenerVidaRestanteComoPorcentaje()}%`);
        console.log(`poke destinatario(restante/total/porcentaje): ${pokemonDestinatario.vida}/${pokemonDestinatario.vidaTotal}/${pokemonDestinatario.obtenerVidaRestanteComoPorcentaje()}%`);
    }
}

export { Batalla };