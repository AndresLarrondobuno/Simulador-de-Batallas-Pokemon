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
async function enviarMensajeAConsumidor(websocket, json) {
    return new Promise((resolve, reject) => {
        websocket.send(JSON.stringify(json));
        // Esperamos a que el mensaje se haya enviado correctamente
        websocket.addEventListener('message', () => {
            resolve();
        });
        // Si hay un error al enviar el mensaje, rechazamos la promesa
        websocket.addEventListener('error', (error) => {
            reject(error);
        });
    });
}


const csrftoken = getCookie('csrftoken');

export {
    csrftoken,
    crearBoton,
    eliminarElementosHijos,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda,
    enviarMensajeAConsumidor,
};