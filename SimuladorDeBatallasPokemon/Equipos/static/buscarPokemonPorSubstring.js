function agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados) {
    for (var i = 0; i < resultados.length; i++) {
        var opcion = document.createElement("option");
        opcion.text = resultados[i];
        elementoSelect.appendChild(opcion);
    }
}


function eliminarElementosHijos(elementoSelect) {
    elementoSelect.innerHTML = '';
}


function buscarPokemonPorSubstring() {
    //obtengo el valor del campo de busqueda (de forma relativa)
    //esto depende de que no agregue otra etiqueta entre input y button
    var busqueda = encodeURIComponent(this.value);
    var elementoSelect = this.nextElementSibling;

    // Realiza una solicitud AJAX al servidor
    
    var urlDeVentanaActual = window.location.origin;
    var urlDeBusqueda = "/equipos/buscarPokemon/?busqueda=" + busqueda;
    var url = urlDeVentanaActual + urlDeBusqueda;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //proceso la respuesta JSON del servidor
            var resultados = JSON.parse(xhr.responseText);

            console.log(busqueda + " ...");
            if (busqueda == '') {
                eliminarElementosHijos(elementoSelect);
            }
            else {
                //actualizo dinamicamente las opciones del campo select sin refrescar la pagina entera
                eliminarElementosHijos(elementoSelect);
                agregarOpcionesASelectAPartirDeResultadosDeBusqueda(elementoSelect, resultados);
            }
        }
    };
    xhr.send();
}


var inputPrimerEleccion = document.getElementById("busquedaPrimerPokemon");
var inputSegundaEleccion = document.getElementById("busquedaSegundoPokemon");
inputPrimerEleccion.addEventListener('input', buscarPokemonPorSubstring);
inputSegundaEleccion.addEventListener('input', buscarPokemonPorSubstring);