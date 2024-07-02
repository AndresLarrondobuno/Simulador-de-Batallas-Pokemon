import { AdministradorDeEventosDeBatalla } from "./administradorDeEventosDeBatalla.js";
import { elementosConListenerParaEleccionVoluntariaDeUsuario } from "./listeners.js";

class AdministradorDeInterfazDeBatalla {
    static actualizarImagenDePokemonEnCombate(entrenador) {
        console.log("actualizarImagenDePokemonEnCombate() ejecutado");
        let pokemonEnCombate = entrenador.pokemonEnCombate;
        let posicionEnEquipo = entrenador.equipo.pokemons.indexOf(pokemonEnCombate);

        if (entrenador.rol === 'solicitante') {
            var imagenPokemonEnCombate = document.getElementById("imagenPokemonEnCombateSolicitante");
            var idImagenPokemonEnCombate = `imagenPokemonSolicitanteSlot${posicionEnEquipo}`;
        }
        if (entrenador.rol === 'destinatario') {
            var imagenPokemonEnCombate = document.getElementById("imagenPokemonEnCombateDestinatario");
            var idImagenPokemonEnCombate = `imagenPokemonDestinatarioSlot${posicionEnEquipo}`;
        }

        let stringImagenNuevoPokemonEnCombate = document.getElementById(idImagenPokemonEnCombate).src;
        imagenPokemonEnCombate.src = stringImagenNuevoPokemonEnCombate;
    }


    static actualizarBotonesDeMovimientos(entrenador) {
        //verificar que sea el entrenador correcto.
        console.log("actualizarBotonesDeMovimientos() ejecutado");
        let pokemonEnCombate = entrenador.pokemonEnCombate;
        let movimientos = pokemonEnCombate.movimientos;
        let contenedorMovimientos = document.getElementById('contenedorMovimientos');
        let botonesMovimientos = contenedorMovimientos.querySelectorAll("button");
        
        botonesMovimientos.forEach(boton => {
            boton.textContent = AdministradorDeInterfazDeBatalla.obtenerNombreDeMovimientoParaBoton(movimientos, boton);
        });
    }


    static actualizarBarraDeVida(rolEntrenador, porcentajeDeVidaRestante) {
        if (rolEntrenador === 'solicitante') {
            var contenedorVidaRestante = document.getElementById("barraVidaRestanteSolicitante");
        }
        else {
            var contenedorVidaRestante = document.getElementById("barraVidaRestanteDestinatario");
        }

        if (porcentajeDeVidaRestante < 0) { porcentajeDeVidaRestante = 0; }
            requestAnimationFrame(() => {
                contenedorVidaRestante.style.width = `${porcentajeDeVidaRestante}%`;
        });

    }


    static obtenerNombreDeMovimientoParaBoton(movimientos, boton) {
        let indice = boton.id[boton.id.length - 1];
        let nombreMovimiento = movimientos[indice].nombre;
        return nombreMovimiento
    }

    
    static iniciarAnimacionDePulso(elementoImagen) {
        elementoImagen.classList.add("imagenPulsante");
    }
    

    static terminarAnimacionDePulso(elementoImagen) {
        elementoImagen.classList.remove("imagenPulsante");
    }


    static desactivarListenersDeAccionesDeBatalla() {
        elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.removeEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }


    static activarListenersDeAccionesDeBatalla() {
        elementosConListenerParaEleccionVoluntariaDeUsuario.forEach(elemento => {
            elemento.addEventListener("click", AdministradorDeEventosDeBatalla.guardarEleccionDeAccionDeBatalla);
        });
    }

}

export { AdministradorDeInterfazDeBatalla };