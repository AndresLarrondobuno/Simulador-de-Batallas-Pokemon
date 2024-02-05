from django.urls import path
from .views import BatallasController

app_name = 'Batallas'


urlpatterns = [
    path('<str:id>/', BatallasController().detalleBatalla, name='detalleBatalla'),
    path('buscarBatalla/', BatallasController().buscarBatalla, name='buscarBatalla'),
]