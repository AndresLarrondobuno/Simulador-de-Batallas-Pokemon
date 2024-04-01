function redireccionarACreacionDeEquipos () {
    window.location.href = '/equipos/crearEquipo/';
}


let botonDeRedireccionACreacionDeEquipos = document.getElementById("botonDeRedireccionACreacionDeEquipos");
botonDeRedireccionACreacionDeEquipos.addEventListener("click", redireccionarACreacionDeEquipos);