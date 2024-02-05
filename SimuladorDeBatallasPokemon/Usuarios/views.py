from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from .forms import FomularioDeCreacionDeUsuario
from django.contrib.auth import login, logout


def registrarUsuario(request):
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


def loguearUsuario(request):
    if request.method == 'POST':
        formulario = AuthenticationForm(data=request.POST)
        if formulario.is_valid():
            usuario = formulario.get_user()
            login(request, usuario)
            return render(request, 'index.html')
    else:
        formulario = AuthenticationForm()
    return render(request, 'formularioDeLogin.html', {'formulario':formulario})


def desloguearUsuario(request):
    if request.method == 'GET':
        logout(request)
    return render(request, "index.html")
