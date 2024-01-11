import sys
sys.path.append(r'C:\programacion\BatallasPokemonMVC\SimuladorDeBatallasPokemon')

from ClasesAuxiliares.FormateadorDeDatos import FormateadorDeDatos
from CargadorDeDatos.obtenerDatosDePokeAPI import DATOS_POKEMONS, DATOS_MOVIMIENTOS

DATOS_FORMATEADOS_DE_POKEMONS = []
DATOS_FORMATEADOS_DE_MOVIMIENTOS = []

for datos in DATOS_POKEMONS:
    datos = FormateadorDeDatos.formatearDatosDePokemon(datos)
    DATOS_FORMATEADOS_DE_POKEMONS.append(datos)

for datos in DATOS_MOVIMIENTOS:
    datos = FormateadorDeDatos.formatearDatosDeMovimiento(datos)
    DATOS_FORMATEADOS_DE_MOVIMIENTOS.append(datos)

print('Datos formateados')