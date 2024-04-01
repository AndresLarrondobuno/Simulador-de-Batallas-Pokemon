import { csrftoken } from "../../../static/js/funcionesAuxiliares.js";

async function aceptarInvitacion() {
    let contenedorInvitacion = this.parentElement;
    let idInvitacion = contenedorInvitacion.dataset.invitacionId;
    let contenedorEquipoDestinatario = document.getElementById("equipoSeleccionado");


    console.log("idInvitacion: ", idInvitacion);

    if (contenedorEquipoDestinatario) {
        let idEquipoDestinatario = contenedorEquipoDestinatario.dataset.equipoId;
        let url = "/batallas/aceptar_invitacion/";

        let datos = JSON.stringify({
            "id" : idInvitacion,
            "idEquipoDestinatario" : idEquipoDestinatario,
        })

        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        };

        const respuesta = await fetch(url, {
            method : "POST",
            headers : headers,
            body : datos,
        });

        if (respuesta.ok) {
            console.log("invitacion aceptada", "id: ", idInvitacion);
            crearBatalla(idInvitacion);
            //borrarInvitacion();
        }
    }
    else {
        console.log("No seleccionaste un equipo para la batalla.")
    }

}

async function crearBatalla(idInvitacion) {
    console.log("id de batalla (db): ", idInvitacion);

    let datos = {
        "idInvitacion" : idInvitacion,
    };

    let jsonDatos = JSON.stringify(datos);

    let url = "/batallas/crear_batalla/";

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: jsonDatos,
    });

    if (respuesta.ok){
        console.log("Batalla guardada en el servidor.");

        respuesta.json().then(datos => {
            const idBatalla = datos.idBatalla;
            redireccionarASalaDeBatalla(idBatalla);

        }).catch(error => {
            console.error("Error al procesar la respuesta JSON:", error);
        });

    }
    else{
        console.log("Hubo un error en la creacion de la batalla.");
    }

}

async function redireccionarASalaDeBatalla(idBatalla) {
    let url = `/batallas/batalla_${idBatalla}`;
    window.location.href = `/batallas/invitaciones_pendientes/`;
    window.open(url, "_blank");
}


let contenedoresDeInvitaciones = document.getElementsByClassName("contenedorAnchoMediano fondo2");
contenedoresDeInvitaciones = Array.from(contenedoresDeInvitaciones);

contenedoresDeInvitaciones.forEach(contenedor => {
    let botonAceptarInvitacion = document.createElement("button");
    botonAceptarInvitacion.classList.add("boton");
    botonAceptarInvitacion.innerHTML = "Aceptar Invitación";
    botonAceptarInvitacion.addEventListener("click", aceptarInvitacion);
    contenedor.appendChild(botonAceptarInvitacion);
});