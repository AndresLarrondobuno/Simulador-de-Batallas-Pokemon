import { obtenerIdDeBatalla } from "../../../../static/js/funcionesAuxiliares.js";

class AdministradorDeConexionWebsocket {

    static iniciarConexionWebsocket() {
        let idBatalla = obtenerIdDeBatalla();
        let url = `ws://${window.location.host}/ws/batallas/batalla_${idBatalla}/`;
        console.log("URL WS:", url);

        let websocket = new WebSocket(url);

        return websocket
    }
}

let websocket = AdministradorDeConexionWebsocket.iniciarConexionWebsocket();

export { websocket };