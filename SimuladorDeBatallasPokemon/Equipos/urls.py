from django.urls import re_path
from .views import EquiposController

app_name = 'Equipos'

urlpatterns = [
    re_path(r'^$', EquiposController().listarEquipos, name='listarEquipos'),
    re_path(r'^crearEquipo/$', EquiposController().crearEquipo, name='crearEquipo'),
]