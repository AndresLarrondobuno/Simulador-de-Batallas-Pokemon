from django.urls import re_path
from .views import crearEquipo

app_name = 'CreacionDeEquipos'

urlpatterns = [
    re_path(r'^equipos/$', crearEquipo, name='crearEquipo')
]