import { Pokemon } from "./pokemon.js";

class Equipo {
    constructor(datosEquipo) {
        this._pokemons = this.obtenerPokemons(datosEquipo);
        this._pokemons[0].enCombate = true;
        this._tamano = datosEquipo.length;
        this._entrenador = null;
    }

    obtenerPokemons(datosEquipo) {
        let pokemons = [];
        datosEquipo.forEach(datosPokemon => {
            let pokemon = new Pokemon(datosPokemon);
            pokemon.equipo = this;
            pokemons.push(pokemon);
        });
        return pokemons
    }


    get pokemons() {
        return this._pokemons
    }


    get tamano() {
        return this._tamano
    }


    get entrenador() {
        return this._entrenador
    }


    set entrenador(entrenador) {
        this._entrenador = entrenador;
    }


    agregarPokemon(pokemon) {
        this.pokemons.push(pokemon);
    }

}

export { Equipo };