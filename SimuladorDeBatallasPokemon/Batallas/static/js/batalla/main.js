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

//Emulo un turno

//Se elige una orden, que proviene de un eventListener asociado al boton de movimiento / cambio de pokemon
//el boton esta asociado a la instancia del entrenador correspondiente
//con la informacion que trae el callback del listener creo un objeto Orden
//el entrenador da la orden


export { rolUsuario, entrenadorSolicitante, entrenadorDestinatario, batalla };