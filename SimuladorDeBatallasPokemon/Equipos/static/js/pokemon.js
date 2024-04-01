class Pokemon {
    constructor(nombre, movimientos=[]) {
        this._nombre = nombre;
        this._movimientos = movimientos;
    }

    agregarMovimiento(movimiento) {
        if ( this._movimientos.length < 4 && movimiento) {
            this._movimientos.push(movimiento);
        }
        else {
            console.log("Solo podes elegir hasta 4 movimientos.")
        }
    }

    agregarMovimientos(movimientos) {
        movimientos.forEach((movimiento) => this.agregarMovimiento(movimiento));
    }


    movimientosSonValidos() {
        let sonValidos = this.movimientos.every(movimiento => {
            return movimiento !== '';
        });
        return sonValidos
    }

    get nombre() {
        return this._nombre
    }

    get movimientos() {
        return this._movimientos
    }

    toString() {
        return `${this.nombre}( ${this.movimientos.length} )`;
      }
}

export { Pokemon }