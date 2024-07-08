function crearBoton(label) {
    let boton = document.createElement("button");
    let nodoTexto = document.createTextNode(label);
    boton.appendChild(nodoTexto);
    return boton
}


async function eliminarElementosHijos(elementoHTML) {
    elementoHTML.innerHTML = '';
}


async function agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados) {
    for (let i = 0; i < resultados.length; i++) {
        let opcion = document.createElement("option");
        opcion.text = resultados[i];
        elementoSelect.appendChild(opcion);
    }
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


//envoltura para enviar el mensaje websocket de forma asincrona y luego esperar a su resolucion para continuar
async function enviarMensajeAConsumidor(websocket, mensaje, mensajeEnviadoAConsumidorConExito) {
    websocket.send(JSON.stringify(mensaje));
    if (mensajeEnviadoAConsumidorConExito) {
        mensajeEnviadoAConsumidorConExito(mensaje);
    }
};


function mensajeEnviadoAConsumidorConExito() {
    console.log("mensaje enviado al consumidor con exito. mensaje: ", mensaje);
}


function obtenerIdDeBatalla() {
    return document.getElementById("datosBatalla").dataset.id;

}


function obtenerRolDeBatallaDeUsuario() {
    return document.getElementById("datosBatalla").dataset.rolUsuario;
}


function primeraLetraMayuscula(cadena) {
    if (cadena.length === 0) return "";
    return cadena[0].toUpperCase() + cadena.slice(1);
}


function obtenerContenedorDeImagenesParaCambioAPartirDeRol(rol) {
    let rolConMayusculaInicial = primeraLetraMayuscula(rol);
    let idContenedor = `equipo${rolConMayusculaInicial}`;
    return document.getElementById(idContenedor);
}


function obtenerPokemonAPartirDeIdDeImagen(batalla, idImagen) {
    let rol = obtenerRolDeBatallaDeUsuario();
    let entrenador = batalla.obtenerEntrenadorPorRol(rol);
    let indiceEnEquipo = idImagen[idImagen.length - 1];
    return entrenador.equipo.pokemons[indiceEnEquipo];

}


function imprimirEstadoDePokemonsEnCombate() {
    let pokemonSolicitante = batalla.entrenadores['entrenadorSolicitante'].pokemonEnCombate;
    let pokemonDestinatario = batalla.entrenadores['entrenadorDestinatario'].pokemonEnCombate;
    console.log(`poke solicitante(restante/total/porcentaje): ${pokemonSolicitante.vida}/ ${pokemonSolicitante.vidaTotal}/ ${pokemonSolicitante.obtenerVidaRestanteComoPorcentaje()}%`);
    console.log(`poke destinatario(restante/total/porcentaje): ${pokemonDestinatario.vida}/${pokemonDestinatario.vidaTotal}/${pokemonDestinatario.obtenerVidaRestanteComoPorcentaje()}%`);
    console.log();
    console.log('///////////////////////////////////////////////');
    console.log();
}


const csrftoken = getCookie('csrftoken');

export {
    csrftoken,
    crearBoton,
    eliminarElementosHijos,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda,
    enviarMensajeAConsumidor,
    mensajeEnviadoAConsumidorConExito,
    obtenerIdDeBatalla,
    obtenerRolDeBatallaDeUsuario,
    obtenerContenedorDeImagenesParaCambioAPartirDeRol,
    obtenerPokemonAPartirDeIdDeImagen,
    primeraLetraMayuscula,
    imprimirEstadoDePokemonsEnCombate
};