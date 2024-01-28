from django.urls import re_path
from .views import crearEquipo, buscarPokemon, listarEquipos, buscarMovimiento

app_name = 'Equipos'

urlpatterns = [
    re_path(r'^$', listarEquipos, name='listarEquipos'),
    re_path(r'^crearEquipo/$', crearEquipo, name='crearEquipo'),
    re_path(r'^buscarPokemon/$', buscarPokemon, name='buscarPokemon'),
    re_path(r'^buscarMovimiento/$', buscarMovimiento, name='buscarMovimiento'),
]