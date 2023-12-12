from django.urls import re_path
from .views import detallePokemon, detalleMovimiento

app_name = 'Pokemons'


urlpatterns = [
    re_path(r'^(?P<slug>[-\w]+)/$', detallePokemon, name='detallePokemon'),
    re_path(r'^movimientos/(?P<slug>[-\w]+)/$', detalleMovimiento, name='detalleMovimiento'),

]