from django.shortcuts import render
from Pokemons.models import EspeciePokemon, Movimiento


def detalleEspecie(request, slug):
    especie = EspeciePokemon.objects.get(slug=slug)
    return render(request, 'detalleEspecie.html', {'especie':especie})


def detalleMovimiento(request, slug):
    movimiento = Movimiento.objects.get(slug=slug)
    return render(request, 'detalleMovimiento.html', {'movimiento':movimiento})