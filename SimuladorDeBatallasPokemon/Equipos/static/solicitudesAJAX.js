import {csrftoken,
agregarOpcionesASelectAPartirDeResultadosDeBusqueda,
eliminarElementosHijos,
equipoEsValido} from "./funcionesAuxiliares.js";


function buscarPokemonPorSubstring() {
    var busqueda = this.value;
    var elementoSelect = this.nextElementSibling;

    var url = "/equipos/buscarPokemon/?busqueda=" + busqueda;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultados = JSON.parse(xhr.responseText);
            eliminarElementosHijos(elementoSelect);
            agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
        }
    };
    xhr.send();
}

function buscarMovimientoPorSubstring() {
    var busqueda = encodeURIComponent(this.value).trim();
    var nombreDePokemon = this.previousElementSibling.textContent;
    var elementoSelect = this.nextElementSibling;

    var url = "/equipos/buscarMovimiento/?busqueda=" + busqueda + "&nombrePokemon=" + nombreDePokemon;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultados = JSON.parse(xhr.responseText);
            eliminarElementosHijos(elementoSelect);
            agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
        }
    };
    xhr.send();
}


function guardarEquipo(event, equipo) {
    var equipoValido = equipoEsValido(equipo);

    if (equipoValido) {
        var url = "/equipos/crearEquipo/";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-CSRFToken", csrftoken);

        var primerPokemon = equipo[0];
        var segundoPokemon = equipo[1];
        

        var datos = {
            "primerPokemon": {"nombre":primerPokemon.nombre, "movimientos":primerPokemon.movimientos},
            "segundoPokemon": {"nombre":segundoPokemon.nombre, "movimientos":segundoPokemon.movimientos},
            "csrftoken":csrftoken
        };

        var jsonDatos = JSON.stringify(datos);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("tu equipo fue creado con exito!");
                console.log(equipo);
                console.log("datos enviados a servidor: " + jsonDatos);
                window.location.href = '/equipos/'; //se encarga de la redireccion del lado del cliente
            }
        };
        xhr.send(jsonDatos);
    }
    else {
        console.log("el equipo no es valido.");
    }
}


export {buscarPokemonPorSubstring, buscarMovimientoPorSubstring, guardarEquipo};