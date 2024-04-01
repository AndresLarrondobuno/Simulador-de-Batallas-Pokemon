class Batalla {
    constructor(entrenadorSolicitante, entrenadorDestinatario) {
        this._entrenadores = {
            "entrenadorSolicitante": entrenadorSolicitante,
            "entrenadorDestinatario": entrenadorDestinatario
        }

        entrenadorSolicitante.batalla = this;
        entrenadorDestinatario.batalla = this;
    }


    get entrenadores() {
        return this._entrenadores
    }


    obtenerOponente(entrenador) {
        if (entrenador.rol === 'solicitante') {
            return this.entrenadores["entrenadorDestinatario"]
        }
        else {
            return this.entrenadores["entrenadorSolicitante"]
        }
    }


    ejecutarTurno() {
        console.log("ejecutarTurno");
        //decido orden de ejecucion
        this.entrenadores['entrenadorSolicitante'].darOrden();
        this.entrenadores['entrenadorDestinatario'].darOrden();
    }

}

export { Batalla };