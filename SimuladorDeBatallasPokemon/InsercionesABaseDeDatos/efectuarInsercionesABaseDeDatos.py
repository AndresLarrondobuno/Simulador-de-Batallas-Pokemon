#necesario para que sea encontrado la ruta al directorio padre y poder hacer importaciones a directorios hermanos
import sys
sys.path.append(r'C:\programacion\BatallasPokemonMVC\SimuladorDeBatallasPokemon')

from formatearDatosParaInsercionABaseDeDatos import DATOS_FORMATEADOS_DE_POKEMONS, DATOS_FORMATEADOS_DE_MOVIMIENTOS

import os
import django
os.environ['DJANGO_SETTINGS_MODULE'] = 'SimuladorDeBatallasPokemon.SimuladorDeBatallasPokemon.settings'
django.setup()

from Pokemons.models import EspeciePokemon, Movimiento
from django.template.defaultfilters import slugify

def insertarEspeciesPokemon():
    for datos in DATOS_FORMATEADOS_DE_POKEMONS:
        poseeTipoSecundario = datos['tipoSecundario']
        especie = EspeciePokemon(
            nombre = datos['nombre'],
            tipoPrincipal = datos['tipoPrincipal'],
            tipoSecundario = datos['tipoSecundario'] if poseeTipoSecundario else '',
            vidaBase = datos['vida'],
            ataqueBase = datos['ataque'],
            defensaBase = datos['defensa'],
            ataqueEspecialBase = datos['ataqueEspecial'],
            defensaEspecialBase = datos['defensaEspecial'],
            velocidadBase = datos['velocidad'],

            imagenFrente = datos['imagenes']['imagenFrente'],
            imagenEspalda = datos['imagenes']['imagenEspalda'],

            slug = slugify(datos['nombre'])
        )
        especie.save()
        print(f'{datos["nombre"]} agregado a la base de datos.')

        movimientos = Movimiento.objects.filter(nombre__in = datos['movimientos'])
        especie.movimientos.set(movimientos)
        especie.save()

        print(f'movimientos de {datos["nombre"]} agregados.')



def insertarMovimientos():
    for datos in DATOS_FORMATEADOS_DE_MOVIMIENTOS:
        potenciaNoEsNula = datos['potencia']
        precisionNoEsNula = datos['precision']
        movimiento = Movimiento(
        nombre = datos['nombre'],
        tipo = datos['tipo'],
        potencia = datos['potencia'] if potenciaNoEsNula else 0,
        precision = datos['precision'] if precisionNoEsNula else 0,

        slug = slugify(datos['nombre']),
        )
        movimiento.save()
        print(f'{datos["nombre"]} agregado a la base de datos.')


insertarMovimientos()
insertarEspeciesPokemon()