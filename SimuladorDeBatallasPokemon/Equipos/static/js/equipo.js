
class Equipo {
    constructor(nombre='', integrantes=[]) {
        this._nombre = nombre;
        this._integrantes = integrantes;
        this._tamano = 2;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    get nombre() {
        return this._nombre
    }

    get integrantes() {
        return this._integrantes
    }

    get tamano() {
        return this._tamano
    }

    
    agregarPokemon(pokemon) {
        this.integrantes.push(pokemon);
    }


    equipoCompleto() {
        return this.integrantes.length === this.tamano;
    }


    equipoVacio() {
        return this.integrantes.length === 0;
    }


    equipoEsValido() {
        const todosTienenCuatroMovimientos = this.integrantes.every(pokemon => {
            return pokemon.movimientos.length === 4;
        });
    
        const todosTienenMovimientosValidos = this.integrantes.every(pokemon => {
            return pokemon.movimientosSonValidos(pokemon.movimientos);
        });
        
        const tamanoValido = this.equipoCompleto();
    
        console.log( tamanoValido + " // " + todosTienenCuatroMovimientos + " // " + todosTienenMovimientosValidos);
    
        return tamanoValido && todosTienenCuatroMovimientos && todosTienenMovimientosValidos 
    }


    toString() {
        return `${this.nombre}( ${this.integrantes.length} )`;
    }
}

export { Equipo, }