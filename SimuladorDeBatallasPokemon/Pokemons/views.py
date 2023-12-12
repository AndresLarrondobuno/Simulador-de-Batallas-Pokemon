from django.shortcuts import render
from Pokemons.models import EspeciePokemon, Movimiento

def detallePokemon(request, slug):
    pokemon = EspeciePokemon.objects.get(slug=slug)
    return render(request, 'detallePokemon.html', {'pokemon':pokemon})


def detalleMovimiento(request, slug):
    movimiento = Movimiento.objects.get(slug=slug)
    return render(request, 'detalleMovimiento.html', {'movimiento':movimiento})