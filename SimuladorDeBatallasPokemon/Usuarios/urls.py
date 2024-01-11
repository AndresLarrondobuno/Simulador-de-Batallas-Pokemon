from django.urls import re_path
from .views import registrarUsuario, loguearUsuario, desloguearUsuario

app_name = 'Usuarios'

urlpatterns = [
    re_path(r'^registrate/$', registrarUsuario, name='registrarUsuario'),
    re_path(r'^login/$', loguearUsuario, name='loguearUsuario'),
    re_path(r'^logout/$', desloguearUsuario, name='desloguearUsuario')
]