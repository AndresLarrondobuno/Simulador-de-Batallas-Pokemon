from django.urls import re_path
from .views import PokemonsController

app_name = 'Pokemons'


urlpatterns = [
    re_path(r'^buscarEspecie/$', PokemonsController().buscarEspecie, name='buscarEspecie'),
    re_path(r'^(?P<slug>[-\w]+)/$', PokemonsController().detalleEspecie, name='detalleEspecie'),
    re_path(r'^movimientos/(?P<slug>[-\w]+)/$', PokemonsController().detalleMovimiento, name='detalleMovimiento'),
]