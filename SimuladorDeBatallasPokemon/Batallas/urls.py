from django.urls import re_path
from .views import BatallasController
from Equipos.views import EquiposController

app_name = 'Batallas'

urlpatterns = [
    re_path(r'^buscarBatalla/$', EquiposController().listarEquipos, name='listarEquipos'),
    re_path(r'^batalla_(?P<id>[-\w]+)/$', BatallasController().batalla, name='batalla'),
    re_path(r'^crear_invitacion_a_batalla/$', BatallasController().crear_invitacion_a_batalla, name='crear_invitacion_a_batalla'),
    re_path(r'^consultar_invitaciones_pendientes/$', BatallasController().consultar_invitaciones_pendientes, name='consultar_invitaciones_pendientes'),
    re_path(r'^consultar_batallas_pendientes/$', BatallasController().consultar_batallas_pendientes, name='consultar_batallas_pendientes'),
    re_path(r'^invitaciones_pendientes/$', BatallasController().mostrar_invitaciones_pendientes, name='invitaciones_pendientes'),
    re_path(r'^aceptar_invitacion/$', BatallasController().aceptar_invitacion, name='aceptar_invitacion'),
    re_path(r'^crear_batalla/$', BatallasController().crear_batalla, name='crear_batalla'),
    re_path(r'^guardar_eleccion_de_accion_de_batalla/$', BatallasController().guardar_eleccion_de_accion_de_batalla, name='guardar_eleccion_de_accion_de_batalla'),
]