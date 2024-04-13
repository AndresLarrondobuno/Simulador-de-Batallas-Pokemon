import { enviarMensajeAConsumidor } from "../../../static/js/funcionesAuxiliares.js";
import { websocket } from "../conexionesWebsocket/iniciarConexionWs.js";

class Batalla {
    constructor(entrenadorSolicitante, entrenadorDestinatario) {
        this._entrenadores = {
            "entrenadorSolicitante": entrenadorSolicitante,
            "entrenadorDestinatario": entrenadorDestinatario,
        }

        entrenadorSolicitante.batalla = this;
        entrenadorDestinatario.batalla = this;

        this._turnoActual = 1;
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


    ejecutarTurno() {
        console.log("ambasOrdenesSonDeAtaque() -> ", this.ambasOrdenesSonDeAtaque());
        if (this.ambasOrdenesSonDeAtaque()){
            var entrenadoresOrdenadosParaEjecucion = this.obtenerOrdenDeEjecucionPorVelocidad();
        }
        else {
            var entrenadoresOrdenadosParaEjecucion = this.obtenerOrdenDeEjecucionPorPrioridad();
        }

        console.log("ejecutarTurno() ", entrenadoresOrdenadosParaEjecucion);

        entrenadoresOrdenadosParaEjecucion.forEach(entrenador => {
            entrenador.darOrden();
            
            var mensajeOrden = entrenador.orden.mensajeDeEjecucion;

            let relatoDeAccion = {
                'message': mensajeOrden, //contenido
                'type': 'relatoDeAccionDeBatalla', //handler
            };

            enviarMensajeAConsumidor(websocket, relatoDeAccion);
        });

        this.siguienteTurno();
    }
}

export { Batalla };