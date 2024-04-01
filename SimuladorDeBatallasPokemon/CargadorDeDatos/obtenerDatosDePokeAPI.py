import sys
sys.path.append(r'C:\programacion\BatallasPokemonMVC\SimuladorDeBatallasPokemon')
import json as json
import requests_cache
from CargadorDeDatos.cargadorDeDatos import CargadorDeDatos


requests_cache.install_cache('C:\programacion\BatallasPokemonMVC\SimuladorDeBatallasPokemon\CargadorDeDatos\CachePokemonsGeneracionUno.sqlite')

print("Iniciando solicitudes a la API...")

def obtenerDatosDePokemons() -> list:
    datosPokemons = []

    for id in range(1, 310):
        datosPokemon = CargadorDeDatos.cargarDatosDePokemon(id)
        imagenes = CargadorDeDatos.cargarDatosDeImagenes(id)
        datosPokemon['imagenes'] = imagenes
        datosPokemons.append(datosPokemon)
    return datosPokemons


def obtenerDatosDeMovimientos() -> list:
    datosMovimientos = []

    for id in range(1, 300):
        datosMovimiento = CargadorDeDatos.cargarDatosDeMovimiento(id)
        datosMovimientos.append(datosMovimiento)
    return datosMovimientos


DATOS_POKEMONS = obtenerDatosDePokemons()
DATOS_MOVIMIENTOS = obtenerDatosDeMovimientos()