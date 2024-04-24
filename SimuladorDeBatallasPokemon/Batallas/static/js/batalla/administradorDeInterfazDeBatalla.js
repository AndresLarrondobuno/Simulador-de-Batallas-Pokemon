
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
        console.log("rolEntrenador: ", rolEntrenador);
        if (rolEntrenador === 'solicitante') {
            var contenedorVidaRestante = document.getElementById("barraVidaRestanteSolicitante");
        }
        else {
            var contenedorVidaRestante = document.getElementById("barraVidaRestanteDestinatario");
        }
        console.log(`width ANTES de requestAnimationFrame: ${contenedorVidaRestante.style.width}`);
        requestAnimationFrame(() => {
            contenedorVidaRestante.style.width = `${porcentajeDeVidaRestante}%`;
        });
        console.log(`width DESPUES de requestAnimationFrame: ${contenedorVidaRestante.style.width}`);

    }


    static obtenerNombreDeMovimientoParaBoton(movimientos, boton) {
        let indice = boton.id[boton.id.length - 1];
        let nombreMovimiento = movimientos[indice].nombre;
        return nombreMovimiento
    }
}

export { AdministradorDeInterfazDeBatalla };