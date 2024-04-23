class AdministradorDeInterfazDeChat {
    static imprimirMensajeDeUsuario(mensaje) {
        let contenedorMensajes = document.getElementById("contenedorMensajes");
        let elementoMensaje = document.createElement("p");
        elementoMensaje.textContent = mensaje;
        contenedorMensajes.appendChild(elementoMensaje);
    }


    static imprimirRelatoDeAccionDeBatalla(mensaje) {
        let contenedorMensajes = document.getElementById("contenedorMensajes");
        let elementoMensaje = document.createElement("p");
        elementoMensaje.classList.add("relatoDeAccionEnBatalla");
        elementoMensaje.textContent = mensaje;
        contenedorMensajes.appendChild(elementoMensaje);
    }
}

export { AdministradorDeInterfazDeChat };