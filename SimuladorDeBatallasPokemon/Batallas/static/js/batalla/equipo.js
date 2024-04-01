import { Pokemon } from "./pokemon.js";

class Equipo {
    constructor(datosEquipo) {
        this._pokemons = this.obtenerPokemons(datosEquipo);
        this._pokemons[0].enCombate = true; //falgeo al lider(pokemon en combate) con propiedad enCombate
        this._tamano = datosEquipo.length;
    }

    obtenerPokemons(datosEquipo) {
        let pokemons = [];
        datosEquipo.forEach(datosPokemon => {
            let pokemon = new Pokemon(datosPokemon);
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


    agregarPokemon(pokemon) {
        this.pokemons.push(pokemon);
    }

}

export { Equipo };