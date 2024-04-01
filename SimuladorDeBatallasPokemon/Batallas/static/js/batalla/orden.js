import { websocket } from "../conexionesWebsocket/iniciarConexionWs.js";

class Orden {
    constructor(entrenador) {
        this._entrenador = entrenador;
    }


    get prioridad() {
        return this._prioridad
    }


    get entrenador() {
        return this._entrenador
    }


    ejecutar() {
        throw new Error('Método abstracto debe ser implementado por las subclases.');
    }


    mensaje() {
        throw new Error('Método abstracto debe ser implementado por las subclases.');
    }


    prioridad() {
        throw new Error('Método abstracto debe ser implementado por las subclases.');
    }
}


class OrdenDeAtaque extends Orden {
    constructor(entrenador, informacionDeOrden) {
        super(entrenador);
        console.log("informacionDeOrden, objeto OrdenDeAtaque", informacionDeOrden);
        this._prioridad = 2;
        this._indiceMovimiento = informacionDeOrden['indiceMovimiento'];

    }


    get indiceMovimiento() {
        return this._indiceMovimiento
    }


    ejecutar() {
        //obtener pokemon atacado
        let batalla = this.entrenador.batalla;
        let entrenadorOponente = batalla.obtenerOponente(this.entrenador);
        let pokemonAtacante = this.entrenador.pokemonEnCombate;
        console.log("entrenador: ", this.entrenador);
        let pokemonAtacado = entrenadorOponente.pokemonEnCombate;
        console.log("entrenador oponente: ", entrenadorOponente);
        let movimiento = pokemonAtacante.movimientos[this.indiceMovimiento];
        console.log("movimiento usado: ", movimiento);

        let danoCausado = pokemonAtacante.atacar(pokemonAtacado, movimiento);

        let mensaje = this.mensaje(pokemonAtacante, pokemonAtacado, movimiento, danoCausado);

        let mensajeJSON = JSON.stringify({
            'mensaje': mensaje, //contenido
            'type': 'relatoDeAccionDeBatalla', //handler
        });

        websocket.send(mensajeJSON);
    }


    mensaje(pokemonAtacante, pokemonAtacado, movimiento, danoCausado) {
        return `${pokemonAtacante} ataco a ${pokemonAtacado} con ${movimiento} quitandole ${danoCausado} puntos de vida.`
    }


    prioridad() {
        //funcion para usar como clave de ordenamiento cuando decida el orden de las ordenes a ejecutar
        return
    }
}


class OrdenDeCambioDePokemon extends Orden {
    constructor(informacionDeOrden) {
        super(entrenador);
        this._prioridad = 1;
    }


    ejecutar() {
        return
    }


    mensaje() {
        return
    }


    prioridad() {
        return
    }
}

export { Orden, OrdenDeAtaque, OrdenDeCambioDePokemon };