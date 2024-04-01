import {csrftoken} from "/../../static/js/funcionesAuxiliares.js";

async function logearUsuario(event) {
    event.preventDefault();
    let inputNombreUsuario = document.getElementById("id_username");
    let inputPassword = document.getElementById("id_password");
    let nombreUsuario = inputNombreUsuario.value;
    let password = inputPassword.value;

    let url = "/usuarios/login/";

    let datos = {
        "nombreUsuario":nombreUsuario,
        "password":password,
    }

    let jsonDatos = JSON.stringify(datos);

    let headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: jsonDatos,
    });

    if (respuesta.ok) {
        console.log("Usuario logeado correctamente.");
        window.location.href = "/equipos/";

    } else {
        console.log("Hubo un error en la solicitud.");
    }

    return respuesta.ok
}

let formularioLogin = document.getElementById("formularioLogin");
formularioLogin.addEventListener("submit", logearUsuario);