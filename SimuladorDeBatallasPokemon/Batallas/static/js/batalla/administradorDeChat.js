class AdministradorDeChat {
    static enviarMensajeDeUsuario(mensaje) {
        let contenedorMensajes = document.getElementById("contenedorMensajes");
        let elementoMensaje = document.createElement("p");
        elementoMensaje.textContent = mensaje;
        contenedorMensajes.appendChild(elementoMensaje);
    }


    static relatarAccionDeBatalla(mensaje) {
        let contenedorMensajes = document.getElementById("contenedorMensajes");
        let elementoMensaje = document.createElement("p");
        elementoMensaje.classList.add("relatoDeAccionEnBatalla");
        elementoMensaje.textContent = mensaje;
        contenedorMensajes.appendChild(elementoMensaje);
    }
}

export { AdministradorDeChat };