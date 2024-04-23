import { Equipo } from "./equipo.js"
import { Entrenador } from "./entrenador.js"
import { Batalla } from "./batalla.js"

let rolUsuario = document.getElementById("tituloBatalla").dataset.rolUsuario;

let datosEquipoSolicitante = JSON.parse(document.getElementById("equipoSolicitante").dataset.equipoSolicitante);
let datosEquipoDestinatario = JSON.parse(document.getElementById("equipoDestinatario").dataset.equipoDestinatario);

let equipoSolicitante = new Equipo(datosEquipoSolicitante);
let equipoDestinatario = new Equipo(datosEquipoDestinatario);

let entrenadorSolicitante = new Entrenador('solicitante', equipoSolicitante);
let entrenadorDestinatario = new Entrenador('destinatario', equipoDestinatario);

let batalla = new Batalla(entrenadorSolicitante, entrenadorDestinatario);

export { rolUsuario, entrenadorSolicitante, entrenadorDestinatario, batalla };