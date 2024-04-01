from django.urls import re_path
from .views import UsuariosController

app_name = 'Usuarios'

urlpatterns = [
    re_path(r'^registrate/$', UsuariosController().registrarUsuario, name='registrarUsuario'),
    re_path(r'^login/$', UsuariosController().logearUsuario, name='logearUsuario'),
    re_path(r'^logout/$', UsuariosController().deslogearUsuario, name='deslogearUsuario'),
    re_path(r'^buscarNombresDeUsuario/$', UsuariosController().buscarNombresDeUsuario, name='buscarNombresDeUsuario'),
]