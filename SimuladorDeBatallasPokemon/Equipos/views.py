from django.shortcuts import render, HttpResponse
from .models import EquipoPokemon
from Pokemons.models import Movimiento, EspeciePokemon
from Pokemons.views import PokemonsController
from Usuarios.models import PerfilUsuario
import json

#no puedo dejar sin valor de retorno a una vista, por mas maneje la redireccion del lado del cliente
#si el valor de retorno es un HttpResponse('') vacio, la consola indica un error "failed loading POST request"

class EquiposController():

    def crearEquipo(self, request):
        if request.method == "POST":
            datosDecodificados = json.loads(request.body)
            
            usuario = request.user
            perfilUsuario, _ = PerfilUsuario.objects.get_or_create(usuario=usuario)

            cantidadDeEquipos = EquipoPokemon.objects.filter(perfilUsuario=perfilUsuario).count()
            
            nombre = datosDecodificados["nombre"] if datosDecodificados["nombre"] else f"Equipo {cantidadDeEquipos + 1}"

            equipo = EquipoPokemon.objects.create(nombre=nombre, tamano=2, perfilUsuario=perfilUsuario)

            nombrePrimerPokemon = datosDecodificados["primerPokemon"]["nombre"]
            nombreSegundoPokemon = datosDecodificados["segundoPokemon"]["nombre"]
            nombresDeMovimientosPrimerPokemon = datosDecodificados["primerPokemon"]["movimientos"]
            nombresDeMovimientosSegundoPokemon = datosDecodificados["segundoPokemon"]["movimientos"]
            
            especiePrimerPokemon = EspeciePokemon.objects.get(nombre=nombrePrimerPokemon)
            especieSegundoPokemon = EspeciePokemon.objects.get(nombre=nombreSegundoPokemon)

            primerPokemon = PokemonsController.obtenerPokemonAPartirDeEspecie(nombrePrimerPokemon)
            segundoPokemon = PokemonsController.obtenerPokemonAPartirDeEspecie(nombreSegundoPokemon)

            movimientosPrimerPokemon = Movimiento.objects.filter(nombre__in=nombresDeMovimientosPrimerPokemon)
            movimientosSegundoPokemon = Movimiento.objects.filter(nombre__in=nombresDeMovimientosSegundoPokemon)

            primerPokemon.especie = especiePrimerPokemon
            segundoPokemon.especie = especieSegundoPokemon

            primerPokemon.equipo = equipo #debo determinar la relacion pokemon-equipo antes de guardar al pokemon
            segundoPokemon.equipo = equipo #porque asi funcionan las relaciones oneToMany y oneToOne en Django

            primerPokemon.save()
            segundoPokemon.save()

            primerPokemon.movimientos.set(movimientosPrimerPokemon) #aca puedo setear los movimientos luego de guardar
            segundoPokemon.movimientos.set(movimientosSegundoPokemon) #a los pokemon ya que es relacion ManyToMany


        elif request.method == "GET":
            return render(request, "creacionDeEquipo.html")


        resultadoDeSolicitud = {
            "status": "success",
            "message": "El equipo se creó correctamente.",
            "perfilUsuario": perfilUsuario
        }
        return HttpResponse(resultadoDeSolicitud)


    def listarEquipos(self, request):
        usuario = request.user
        perfilUsuario, _ = PerfilUsuario.objects.get_or_create(usuario=usuario)
        perfilUsuario.equipopokemon_set.all()
        return render(request, 'equipos.html', {'usuario':perfilUsuario})