from django.urls import re_path
from .views import detalleEspecie, detalleMovimiento

app_name = 'Pokemons'


urlpatterns = [
    re_path(r'^(?P<slug>[-\w]+)/$', detalleEspecie, name='detalleEspecie'),
    re_path(r'^movimientos/(?P<slug>[-\w]+)/$', detalleMovimiento, name='detalleMovimiento'),
]