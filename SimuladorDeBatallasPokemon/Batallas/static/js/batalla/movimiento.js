class Movimiento {
    constructor(datosMovimiento) {
        this._nombre = datosMovimiento['nombre'];
        this._tipo = datosMovimiento['tipo'];
        this._potencia = datosMovimiento['potencia'];
        this._precision = datosMovimiento['precision'];
    }


    toString() {
        return this._nombre
    }


    get potencia() {
        return this._potencia
    }


    get precision() {
        return this._precision
    }


    get tipo() {
        return this._tipo
    }


    get nombre() {
        return this._nombre
    }
}

export { Movimiento };