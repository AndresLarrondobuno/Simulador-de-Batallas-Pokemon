import { Movimiento } from "./movimiento.js";

class Pokemon {
    constructor(datosPokemon) {
        this._nombre = datosPokemon['nombre'];
        this._tipoPrincipal = datosPokemon['tipoPrincipal'];
        this._tipoSecundario = datosPokemon['tipoPrincipal'];
        this._vida = datosPokemon['vida'];
        this._ataque = datosPokemon['ataque'];
        this._defensa = datosPokemon['defensa'];
        this._ataqueEspecial = datosPokemon['ataqueEspecial'];
        this._defensaEspecial = datosPokemon['defensaEspecial'];
        this._velocidad = datosPokemon['velocidad'];
        this._movimientos = this.obtenerMovimientos(datosPokemon['movimientos']);
        this._enCombate = false;
    }


    toString() {
        return this._nombre
    }


    get movimientos() {
        return this._movimientos
    }


    set enCombate(seEncuentraEnCombate) {
        this._enCombate = seEncuentraEnCombate;
    }


    set vida(vidaRestante) {
        this._vida = vidaRestante;
    }


    get enCombate() {
        return this._enCombate
    }


    get vida() {
        return this._vida
    }


    get ataque() {
        return this._ataque
    }


    get nombre() {
        return this._nombre
    }


    obtenerMovimientos(datosMovimientos) {
        let movimientos = [];
        datosMovimientos.forEach(datosMovimiento => {
            let movimiento = new Movimiento(datosMovimiento);
            movimientos.push(movimiento);
        });
        return movimientos
    }

    atacar(pokemonAtacado, movimiento) {
        console.log("vida antes del ataque: ", pokemonAtacado.vida);
        let danoCausado = Math.floor(movimiento.potencia / 50) * Math.floor(this.ataque / 10)
        let vidaRestante = pokemonAtacado.vida - danoCausado;
        pokemonAtacado.vida = vidaRestante;
        console.log(`vida restante: ${pokemonAtacado.vida} / objetivo: ${pokemonAtacado.nombre} / movimiento: ${movimiento.nombre}`);
        return danoCausado
    }

}

export { Pokemon };