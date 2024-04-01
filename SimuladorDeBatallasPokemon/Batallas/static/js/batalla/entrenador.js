import { Orden, OrdenDeAtaque, OrdenDeCambioDePokemon } from "./orden.js";

class Entrenador {
    constructor(rol, equipo) {
        this._rol = rol;
        this._equipo = equipo;
        this._orden = null;
        this._batalla = null;
    }


    get batalla() {
        return this._batalla
    }


    set batalla(batalla) {
        this._batalla = batalla;
    }


    get rol() {
        return this._rol
    }


    get equipo() {
        return this._equipo
    }


    get orden() {
        return this._orden
    }


    set orden(nuevaOrden) {
        this._orden = nuevaOrden;
    }


    get pokemonEnCombate() {
        let pokemonEnCombate = null;

        this.equipo.pokemons.forEach(pokemon => {
            if (pokemon.enCombate) {
                pokemonEnCombate = pokemon;
            }
        });
        return pokemonEnCombate
    }


    toString() {
        return this._nombre
    }
    

    darOrden() {
        console.log("entrenador.darOrden()");
        if (this.orden) {
            this.orden.ejecutar();
        }
    }


    cambiarPokemon(pokemonEntrante) {
        pokemonEntrante.enCombate = true;
        this.pokemonEnCombate.enCombate = false;
    }

}

export { Entrenador };