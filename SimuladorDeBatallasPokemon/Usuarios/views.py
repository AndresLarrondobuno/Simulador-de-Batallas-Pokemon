from django.shortcuts import render
from django.http import JsonResponse
from .forms import FomularioDeCreacionDeUsuario, FomularioDeAutenticacionDeUsuario
from .models import User

from django.contrib.auth import login, logout
import json

class UsuariosController():

    def registrarUsuario(self, request):
        if request.method == 'POST':
            formulario = FomularioDeCreacionDeUsuario(request.POST)
            if formulario.is_valid():
                print('USUARIO VALIDO')
                usuario = formulario.save()
                login(request, usuario)
            else:
                print('USUARIO INVALIDO')
            return render(request, 'index.html')

        else:
            formulario = FomularioDeCreacionDeUsuario()
            return render(request, 'formularioDeRegistroDeUsuario.html', {'formulario':formulario})


    def logearUsuario(self, request):
        if request.method == 'POST':
            datos = json.loads(request.body)
            nombreUsuario = datos['nombreUsuario']
            usuario = User.objects.get(username=nombreUsuario)
            login(request, usuario)
            return render(request, 'index.html')
        
        else:
            formulario = FomularioDeAutenticacionDeUsuario()
        return render(request, 'formularioDeLogin.html', {'formulario':formulario})


    def deslogearUsuario(self, request):
        if request.method == 'GET':
            logout(request)
        return render(request, "index.html")


    def buscarNombresDeUsuario(self, request):
        if request.method == "GET":
            busqueda = request.GET.get('busqueda', '')

            if busqueda:
                nombres = User.objects.filter(username__istartswith=busqueda).values_list("username", flat=True)
                print(f"busqueda: .{busqueda}.")
            else:
                nombres = User.objects.all().values_list("username", flat=True)

        print("nombres encontrados:", nombres)

        return JsonResponse(list(nombres), safe=False)