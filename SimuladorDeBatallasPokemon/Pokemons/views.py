from django.shortcuts import render
from django.http import JsonResponse
from Pokemons.models import EspeciePokemon, Movimiento, Pokemon


class PokemonsController():

    def buscarNombresDePokemons(self, request):
        if request.method == 'GET':
            busqueda = request.GET.get('busqueda', '')

            if busqueda:
                nombres = EspeciePokemon.objects.filter(nombre__istartswith=busqueda).values_list('nombre', flat=True)
                print(f"busqueda: .{busqueda}.")
            else:
                nombres = EspeciePokemon.objects.all().values_list('nombre', flat=True)

            return JsonResponse(list(nombres), safe=False)


    def buscarNombresDeMovimientos(self, request):
        busqueda = request.GET.get('busqueda', '')
        nombrePokemon = request.GET.get('nombrePokemon', '')
        pokemon = EspeciePokemon.objects.get(nombre=nombrePokemon)

        if busqueda:
            resultados = pokemon.movimientos.filter(nombre__istartswith=busqueda).values_list('nombre', flat=True)
        else:
            resultados = pokemon.movimientos.all().values_list('nombre', flat=True)

        resultados = list(resultados)
        return JsonResponse(resultados, safe=False)
    

    def buscarEspecie(self, request):
        nombrePokemon = request.GET.get('nombrePokemon', '')
        especie = EspeciePokemon.objects.get(nombre=nombrePokemon)
        return JsonResponse(especie.obtenerIcono(), safe=False)


    def detalleEspecie(self, request, slug):
        print("SLUG:", slug)
        especie = EspeciePokemon.objects.get(slug=slug)
        return render(request, 'detalleEspecie.html', {'especie':especie})


    def detalleMovimiento(self, request, slug):
        movimiento = Movimiento.objects.get(slug=slug)
        return render(request, 'detalleMovimiento.html', {'movimiento':movimiento})
    
    
    @staticmethod
    def obtenerPokemonAPartirDeEspecie(nombre) -> Pokemon:
        especie = EspeciePokemon.objects.get(nombre=nombre)

        pokemon = Pokemon.objects.create(
            nombre = nombre,
            tipoPrincipal = especie.tipoPrincipal,
            tipoSecundario = especie.tipoSecundario,

            vida = especie.vidaBase,
            ataque = especie.ataqueBase,
            defensa = especie.defensaBase,
            ataqueEspecial = especie.ataqueEspecialBase,
            defensaEspecial = especie.defensaEspecialBase,
            velocidad = especie.velocidadBase,
            nivel = 50
        )
        return pokemon