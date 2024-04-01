import { OrdenDeAtaque, OrdenDeCambioDePokemon } from "./orden.js";

class AdministradorDeOrdenes {
    static obtenerOrden(entrenador, informacionDeOrden) {
        if (informacionDeOrden['indiceMovimiento']) {
            var orden = new OrdenDeAtaque(entrenador, informacionDeOrden);
        }
        if (informacionDeOrden['indicePokemonParaCambio']) {
            var orden = new OrdenDeCambioDePokemon(entrenador, informacionDeOrden);
        }
        console.log("objeto orden: ", orden);
        return orden
    }


    static asignarOrden(entrenador, informacionDeOrden) {
        let ordenEntrenador = AdministradorDeOrdenes.obtenerOrden(entrenador, informacionDeOrden);
        entrenador.orden = ordenEntrenador;
    }


    static asignarOrdenes(batalla, datosBatalla) {
        //sincroniza las ordenes para ambos clientes porque se llama en ambos
        let entrenadorSolicitante = batalla.entrenadores["entrenadorSolicitante"];
        let entrenadorDestinatario = batalla.entrenadores["entrenadorDestinatario"];

        let informacionDeOrdenSolicitante = datosBatalla["datos_orden_usuario_solicitante"];
        let informacionDeOrdenDestinatario = datosBatalla["datos_orden_usuario_destinatario"];

        AdministradorDeOrdenes.asignarOrden(entrenadorSolicitante, informacionDeOrdenSolicitante);
        AdministradorDeOrdenes.asignarOrden(entrenadorDestinatario, informacionDeOrdenDestinatario);

        console.log("entrenadores: ", entrenadorSolicitante, entrenadorDestinatario);
        console.log("infoOrdenes: ", informacionDeOrdenSolicitante, informacionDeOrdenDestinatario);
    }

}

export { AdministradorDeOrdenes };