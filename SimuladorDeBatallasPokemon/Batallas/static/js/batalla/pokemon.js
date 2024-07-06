import { Movimiento } from "./movimiento.js";
import { primeraLetraMayuscula } from "../../../static/js/funcionesAuxiliares.js";


class Pokemon {
    constructor(datosPokemon) {
        this._nombre = datosPokemon['nombre'];
        this._tipoPrincipal = datosPokemon['tipoPrincipal'];
        this._tipoSecundario = datosPokemon['tipoPrincipal'];
        this._movimientos = this.obtenerMovimientos(datosPokemon['movimientos']);


        this._vidaTotal = datosPokemon['vida'];
        this._vida = datosPokemon['vida'];
        this._ataque = datosPokemon['ataque'];
        this._defensa = datosPokemon['defensa'];
        this._ataqueEspecial = datosPokemon['ataqueEspecial'];
        this._defensaEspecial = datosPokemon['defensaEspecial'];
        this._velocidad = datosPokemon['velocidad'];
        this._enCombate = false;
        
        this._equipo = null;
        this._entrenador = null;
    }


    toString() {
        return this._nombre
    }


    get vivo() {
        if (this.vida > 0) {
            return true
        }
        else {
            return false
        }
    }


    get movimientos() {
        return this._movimientos
    }



    set enCombate(bool) {
        this._enCombate = bool;
    }


    set vida(vidaRestante) {
        this._vida = vidaRestante;
    }


    set equipo(equipo) {
        this._equipo = equipo;
    }


    get equipo() {
        return this._equipo;
    }


    get enCombate() {
        return this._enCombate
    }


    get vida() {
        return this._vida
    }


    get vidaTotal() {
        return this._vidaTotal
    }


    get ataque() {
        return this._ataque
    }


    get nombre() {
        return this._nombre
    }


    get entrenador() {
        return this._entrenador
    }

    get indiceEnEquipo() {
        return this._equipo.pokemons.indexOf(this);
    }


    set entrenador(entrenador) {
        this._entrenador = entrenador;
    }


    obtenerMovimientos(datosMovimientos) {
        let movimientos = [];
        datosMovimientos.forEach(datosMovimiento => {
            let movimiento = new Movimiento(datosMovimiento);
            movimientos.push(movimiento);
        });
        return movimientos
    }


    obtenerVidaRestanteComoPorcentaje() {
        return Math.floor((this.vida * 100) / this.vidaTotal)
    }


    obtenerImagen() {
        let posicionEnEquipo =  this._equipo._pokemons.indexOf(this);
        let rolConMayusculaInicial = primeraLetraMayuscula(this.entrenador.rol);
        let idElementoImagen = `imagenPokemon${rolConMayusculaInicial}Slot${posicionEnEquipo}`;
        return document.getElementById(idElementoImagen);
    }
    

    atacar(pokemonAtacado, movimiento) {
        if (this.vida > 0) {
            let danoCausado = Math.floor(movimiento.potencia / 50) * Math.floor(this.ataque / 10) + 1;
            let vidaRestante = pokemonAtacado.vida - danoCausado;
            pokemonAtacado.vida = vidaRestante;
            return {
                'danoCausado': danoCausado,
                'ataqueFueEjecutado': true
            }
        }
        else {
            return {
                'ataqueFueEjecutado': false
            }
        }
    }

}

export { Pokemon };