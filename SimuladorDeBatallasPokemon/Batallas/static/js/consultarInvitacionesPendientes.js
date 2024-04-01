import {mostrarNotificacionDeInvitacion} from "./mostrarNotificacionDeInvitacion.js"

async function consultarInvitacionesPendientes(){
    let url = "/batallas/consultar_invitaciones_pendientes";

    const respuesta = await fetch(url);
    const resultados = await respuesta.json();

    if (respuesta.ok){
        console.log("resultados: ", resultados);

        if (resultados){
            mostrarNotificacionDeInvitacion('¡Tenés invitaciones pendientes!');
        }
    }
}

//setInterval(consultarInvitacionesPendientes, 8000);