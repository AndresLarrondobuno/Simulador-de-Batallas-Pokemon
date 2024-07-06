class Entrenador {
    constructor(rol, equipo) {
        this._rol = rol;
        this._equipo = equipo;
        this._orden = null;
        this._batalla = null;
        this._pokemonsMuertos = [];

        this.equipo.entrenador = this;

        equipo.pokemons.forEach(pokemon => {
            pokemon.entrenador = this;
        });
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


    get pokemonsMuertos() {
        return this._pokemonsMuertos
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
        return this._rol
    }


    darOrden() {
        console.log(this._rol, ": entrenador.darOrden() ejecutado");
        if (!this.orden.ejecutar()) {
            console.log(`${this.pokemonEnCombate} no pudo atacar porque fue vencido.`);
            //ofrecer cambio de pokemon
        }
        else {
            console.log(`el entrenador ${this.rol} ejecuto una ${this.orden.tipo}`);
        }
    }


    agregarPokemonAPokemonsMuertos(pokemon) {
        this._pokemonsMuertos.push(pokemon);
    }

}

export { Entrenador };