function seleccionarEquipo() {
    resetearSeleccionDeContenedores();
    this.classList.add("fondoSeleccionado");
    this.setAttribute("id", "equipoSeleccionado");
    
}

function resetearSeleccionDeContenedores() {
    contenedoresDeEquipos.forEach(contenedor => {
        contenedor.classList.remove("fondoSeleccionado");
        contenedor.removeAttribute("id");
    });
}

let contenedoresDeEquipos = document.getElementsByClassName("row p-1 contenedorAnchoMediano rounded");
contenedoresDeEquipos = Array.from(contenedoresDeEquipos);

contenedoresDeEquipos.forEach(contenedor => {
    contenedor.addEventListener("click", seleccionarEquipo);
});