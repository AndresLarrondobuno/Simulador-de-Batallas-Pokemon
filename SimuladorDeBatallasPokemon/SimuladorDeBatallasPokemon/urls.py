from django.contrib import admin
from django.urls import path, re_path, include
from .views import inicio


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', inicio, name='inicio'),
    re_path(r'^pokemons/', include('Pokemons.urls')),
    re_path(r'^usuarios/', include('Usuarios.urls')),
    re_path(r'^equipos/', include('Equipos.urls')),

]