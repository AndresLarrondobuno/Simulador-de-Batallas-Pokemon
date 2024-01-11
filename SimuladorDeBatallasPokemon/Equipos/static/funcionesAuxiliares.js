function crearBoton(label) {
    var boton = document.createElement("button");
    var nodoTexto = document.createTextNode(label);
    boton.appendChild(nodoTexto);
    return boton
}

function eliminarElementosHijos(elementoSelect) {
    elementoSelect.innerHTML = '';
}

function agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados) {
    for (var i = 0; i < resultados.length; i++) {
        var opcion = document.createElement("option");
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

function todosLosCaracteresSonEspacios(cadena) {
    
    return cadena === cadena.trim();
}

function equipoEsValido(equipo) {
    const todosTienenCuatroMovimientos = equipo.every(pokemon => {
        return pokemon.movimientos.length === 4;
    });

    const todosTienenMovimientosValidos = equipo.every(pokemon => {
        return movimientosSonValidos(pokemon.movimientos);
    });
    
    const tamanoValido = equipo.length == 2;    

    console.log( tamanoValido + " // " + todosTienenCuatroMovimientos + " // " + todosTienenMovimientosValidos);

    return tamanoValido && todosTienenCuatroMovimientos && todosTienenMovimientosValidos 
}

function movimientosSonValidos(movimientos) {
    var sonValidos = movimientos.every(movimiento => {
        return movimiento !== '';
    });
    return sonValidos
}

const csrftoken = getCookie('csrftoken');

export {
    csrftoken, 
    equipoEsValido,
    crearBoton,
    eliminarElementosHijos,
    agregarOpcionesASelectAPartirDeResultadosDeBusqueda
};