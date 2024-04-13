function iniciarConexionWebsocket() {
    let idBatalla = document.getElementById("tituloBatalla").dataset.id;
    let url = `ws://${window.location.host}/ws/batallas/batalla_${idBatalla}/`;
    console.log("URL WS:", url);

    let websocket = new WebSocket(url);

    return websocket
}

let websocket = iniciarConexionWebsocket();

export { websocket };