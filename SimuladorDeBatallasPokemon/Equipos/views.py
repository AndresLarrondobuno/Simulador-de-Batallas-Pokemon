from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .models import EquipoPokemon
from Pokemons.models import Movimiento, Pokemon, EspeciePokemon
from Usuarios.models import PerfilUsuario
import json

def crearEquipo(request):
    if request.method == 'POST':
        datosDecodificados = json.loads(request.body) #deserializa el json a un objeto python (dict)

        usuario = request.user
        perfilUsuario, _ = PerfilUsuario.objects.get_or_create(usuario=usuario)

        equipo = EquipoPokemon(nombre="test", tamano=2, perfilUsuario=perfilUsuario)
        equipo.save()

        nombrePrimerPokemon = datosDecodificados['primerPokemon']['nombre']
        nombreSegundoPokemon = datosDecodificados['segundoPokemon']['nombre']
        nombresDeMovimientosPrimerPokemon = datosDecodificados['primerPokemon']['movimientos']
        nombresDeMovimientosSegundoPokemon = datosDecodificados['segundoPokemon']['movimientos']

        primerPokemon = obtenerPokemonAPartirDeEspecie(nombrePrimerPokemon, equipo)
        segundoPokemon = obtenerPokemonAPartirDeEspecie(nombreSegundoPokemon, equipo)

        primerPokemon.save()
        segundoPokemon.save()

        movimientosPrimerPokemon = Movimiento.objects.filter(nombre__in=nombresDeMovimientosPrimerPokemon)
        movimientosSegundoPokemon = Movimiento.objects.filter(nombre__in=nombresDeMovimientosSegundoPokemon)

        primerPokemon.movimientos.set(movimientosPrimerPokemon)
        segundoPokemon.movimientos.set(movimientosSegundoPokemon)



    elif request.method == 'GET':
        #renderiza el formulario para llenarlo
        return render(request, "creacionDeEquipo.html")

    return HttpResponse('')
'''por algun motivo no puedo dejar sin valor de retorno la vista, por mas
maneje la redireccion del lado del cliente'''


def obtenerPokemonAPartirDeEspecie(nombre, equipo) -> Pokemon:
    especie = EspeciePokemon.objects.get(nombre=nombre)

    pokemon = Pokemon(
        nombre = nombre,
        tipoPrincipal = especie.tipoPrincipal,
        tipoSecundario = especie.tipoSecundario,

        vida = especie.vidaBase,
        ataque = especie.ataqueBase,
        defensa = especie.defensaBase,
        ataqueEspecial = especie.ataqueEspecialBase,
        defensaEspecial = especie.defensaEspecialBase,
        velocidad = especie.velocidadBase,
        nivel = 50,

        especie = especie,
        equipo = equipo
    )
    return pokemon


def listarEquipos(request):
    usuario = request.user
    perfilUsuario, _ = PerfilUsuario.objects.get_or_create(usuario=usuario)
    perfilUsuario.equipopokemon_set.all()
    return render(request, 'equipos.html', {'usuario':perfilUsuario})


def buscarPokemon(request):
    print('VISTA buscarPokemon')
    if request.method == 'GET':
        busqueda = request.GET.get('busqueda', '')

        if busqueda:
            resultados = EspeciePokemon.objects.filter(nombre__istartswith=busqueda).values_list('nombre', flat=True)
            print(f"busqueda: .{busqueda}.")
        else:
            resultados = EspeciePokemon.objects.all().values_list('nombre', flat=True)

        resultados = list(resultados)
        return JsonResponse(resultados, safe=False)


def buscarMovimiento(request):
    busqueda = request.GET.get('busqueda', '')
    nombrePokemon = request.GET.get('nombrePokemon', '')
    pokemon = EspeciePokemon.objects.get(nombre=nombrePokemon)

    if busqueda:
        resultados = pokemon.movimientos.filter(nombre__istartswith=busqueda).values_list('nombre', flat=True)
    else:
        resultados = pokemon.movimientos.all().values_list('nombre', flat=True)

    resultados = list(resultados)
    return JsonResponse(resultados, safe=False)


def testGrid(request):
    return render(request, 'testGrid.html')