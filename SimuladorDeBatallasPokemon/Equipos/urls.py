from django.urls import re_path
from .views import crearEquipo, buscarPokemon

app_name = 'Equipos'

urlpatterns = [
    re_path(r'^crearEquipo/$', crearEquipo, name='crearEquipo'),
    re_path(r'^buscarPokemon/', buscarPokemon, name='buscarPokemon'),
]