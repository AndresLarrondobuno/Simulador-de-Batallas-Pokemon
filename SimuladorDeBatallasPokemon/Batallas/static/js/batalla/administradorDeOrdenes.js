import { OrdenDeAtaque, OrdenDeCambioDePokemon } from "./orden.js";

class AdministradorDeOrdenes {
    static obtenerOrden(entrenador, informacionDeOrden) {
        if (informacionDeOrden['indiceMovimiento']) {
            var orden = new OrdenDeAtaque(entrenador, informacionDeOrden);
        }
        if (informacionDeOrden['indicePokemonParaCambio']) {
            var orden = new OrdenDeCambioDePokemon(entrenador, informacionDeOrden);
        }
        return orden
    }


    static asignarOrden(entrenador, informacionDeOrden) {
        let orden = AdministradorDeOrdenes.obtenerOrden(entrenador, informacionDeOrden);
        entrenador.orden = orden;
    }


    static asignarOrdenes(batalla, datosBatalla) {
        console.log("metodo asignarOrdenes ejecutado.");
        //sincroniza las ordenes para ambos clientes porque se llama en ambos
        let entrenadorSolicitante = batalla.entrenadores["entrenadorSolicitante"];
        let entrenadorDestinatario = batalla.entrenadores["entrenadorDestinatario"];

        let informacionDeOrdenSolicitante = datosBatalla["datos_orden_usuario_solicitante"];
        let informacionDeOrdenDestinatario = datosBatalla["datos_orden_usuario_destinatario"];

        AdministradorDeOrdenes.asignarOrden(entrenadorSolicitante, informacionDeOrdenSolicitante);
        AdministradorDeOrdenes.asignarOrden(entrenadorDestinatario, informacionDeOrdenDestinatario);
    }




}

export { AdministradorDeOrdenes };