var equipo = [];

function agregarPokemonAEquipo() {
    console.log("funcion agregarPokemonAEquipo ejecutada");
    var tamano = 2;
    var elementoSelect = this.previousElementSibling;
    var nombreDePokemon = elementoSelect.value;

    if (equipo.length < tamano) { 
        equipo.push('');
    } else {
        console.log("no pueden agregarse mas de" + tamano + " pokemons al equipo");
    }
}


var botonAgregarPrimerPokemon = document.getElementById("agregarPrimerPokemon");
var botonAgregarSegundoPokemon = document.getElementById("agregarSegundoPokemon");
botonAgregarPrimerPokemon.addEventListener("click", agregarPokemonAEquipo);
botonAgregarSegundoPokemon.addEventListener("click", agregarPokemonAEquipo);