import { obtenerRolDeBatallaDeUsuario } from "../../../../static/js/funcionesAuxiliares.js";
import { batalla } from "./main.js";

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
        if (entrenador.rol === obtenerRolDeBatallaDeUsuario()) {
            let pokemonEnCombate = entrenador.pokemonEnCombate;
            let movimientos = pokemonEnCombate.movimientos;
            let contenedorMovimientos = document.getElementById('contenedorMovimientos');
            let botonesMovimientos = contenedorMovimientos.querySelectorAll("button");

            botonesMovimientos.forEach(boton => {
                boton.textContent = AdministradorDeInterfazDeBatalla.obtenerNombreDeMovimientoParaBoton(movimientos, boton);
            });
        }
    }


    static actualizarBarraDeVida(entrenador) {
        let porcentajeDeVidaRestante = entrenador.pokemonEnCombate.obtenerVidaRestanteComoPorcentaje();

        if (entrenador.rol === 'solicitante') {
            console.log("actualizando barra de vida de solicitante...");
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


    static actualizarBarraDeVidaDePokemonsEnCombate() {
        let entrenadorSolicitante = batalla.entrenadores['entrenadorSolicitante'];
        let entrenadorDestinatario = batalla.entrenadores['entrenadorDestinatario'];
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida(entrenadorSolicitante);
        AdministradorDeInterfazDeBatalla.actualizarBarraDeVida(entrenadorDestinatario);
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


    static terminarAnimacionesDePulsoDeEquipo(entrenador) {
        entrenador.equipo.pokemons.forEach(pokemon => {
            AdministradorDeInterfazDeBatalla.terminarAnimacionDePulso(pokemon.obtenerImagen());
        });
    }


    static iniciarAnimacionesDePulsoParaSeleccionDePokemon(entrenador) {
        entrenador.equipo.pokemons.forEach(pokemon => {
            if (!pokemon.vivo) {
                AdministradorDeInterfazDeBatalla.terminarAnimacionDePulso(pokemon.obtenerImagen());
            }
        });
    }


}

export { AdministradorDeInterfazDeBatalla };