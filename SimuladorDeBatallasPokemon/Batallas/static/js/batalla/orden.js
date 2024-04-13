class Orden {
    constructor(entrenador) {
        this._entrenador = entrenador;
        this._prioridad = null;
        this._mensajeDeEjecucion = null;
    }


    get mensajeDeEjecucion() {
        return this._mensaje
    }


    get prioridad() {
        return this._prioridad
    }


    get entrenador() {
        return this._entrenador
    }


    set mensajeDeEjecucion(string) {
        this._mensaje = string;
    }


    ejecutar() {
        throw new Error('Método abstracto debe ser implementado por las subclases.');
    }


    mensaje() {
        throw new Error('Método abstracto debe ser implementado por las subclases.');
    }
}


class OrdenDeAtaque extends Orden {
    constructor(entrenador, informacionDeOrden) {
        super(entrenador);
        this._prioridad = 1;
        this._indiceMovimiento = informacionDeOrden['indiceMovimiento'];
    }


    get indiceMovimiento() {
        return this._indiceMovimiento
    }


    ejecutar() {
        //obtener pokemon atacado
        let batalla = this.entrenador.batalla;
        let turnoActual = batalla.turnoActual;
        let entrenadorOponente = batalla.obtenerOponente(this.entrenador);
        let pokemonAtacante = this.entrenador.pokemonEnCombate;
        let pokemonAtacado = entrenadorOponente.pokemonEnCombate;
        let movimiento = pokemonAtacante.movimientos[this.indiceMovimiento];
        let danoCausado = pokemonAtacante.atacar(pokemonAtacado, movimiento);

        this.mensajeDeEjecucion = this.mensaje(turnoActual, pokemonAtacante, pokemonAtacado, movimiento, danoCausado);

    }


    mensaje(turnoActual, pokemonAtacante, pokemonAtacado, movimiento, danoCausado) {
        return `TURNO ${turnoActual}: ${pokemonAtacante} ataco a ${pokemonAtacado} con ${movimiento} quitandole ${danoCausado} puntos de vida.`
    }
}


class OrdenDeCambioDePokemon extends Orden {
    constructor(entrenador, informacionDeOrden) {
        super(entrenador);
        this._prioridad = 2;
        this._indicePokemonEntrante = informacionDeOrden['indicePokemonParaCambio'];

    }


    get indicePokemonEntrante() {
        return this._indicePokemonEntrante
    }


    ejecutar() {
        //necesito que el cambio de pokemon se registre como un evento, y que el handler actualice la imagen en el front.
        let batalla = this.entrenador.batalla;
        let turnoActual = batalla.turnoActual;
        let pokemonSaliente = this.entrenador.pokemonEnCombate;
        let pokemonEntrante = this.entrenador.equipo.pokemons[this.indicePokemonEntrante];
        pokemonSaliente.enCombate = false;
        pokemonEntrante.enCombate = true;

        this.mensajeDeEjecucion = this.mensaje(turnoActual, pokemonEntrante, pokemonSaliente);
    }


    mensaje(turnoActual, pokemonEntrante, pokemonSaliente) {
        return `TURNO ${turnoActual}: ${this.entrenador} retiro a ${pokemonSaliente} y eligio a ${pokemonEntrante} para continuar la batalla.`
    }
}

export { Orden, OrdenDeAtaque, OrdenDeCambioDePokemon };