from django.shortcuts import render
from django.http import JsonResponse
from .models import EspeciePokemon

def crearEquipo(request):
    if request.method == 'POST':
        pass
    else:
        print("VISTA crearEquipo")

    return render(request, 'creacionDeEquipo.html')



def buscarPokemon(request):
    print('VISTA buscarPokemon')
    if request.method == 'GET':
        busqueda = request.GET.get('busqueda', '')
        resultados = EspeciePokemon.objects.filter(nombre__icontains=busqueda).values_list('nombre', flat=True)
        resultados = list(resultados)
        return JsonResponse(resultados, safe=False)