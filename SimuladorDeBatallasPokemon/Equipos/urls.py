from django.urls import re_path
from .views import EquiposController
from Pokemons.views import PokemonsController

app_name = 'Equipos'

urlpatterns = [
    re_path(r'^$', EquiposController().listarEquipos, name='listarEquipos'),
    re_path(r'^crearEquipo/$', EquiposController().crearEquipo, name='crearEquipo'),
    re_path(r'^buscarNombresDePokemons/$', PokemonsController().buscarNombresDePokemons, name='buscarNombresDePokemons'),
    re_path(r'^buscarNombresDeMovimientos/$', PokemonsController().buscarNombresDeMovimientos, name='buscarNombresDeMovimientos'),
]