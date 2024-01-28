from django.shortcuts import render

def detalleBatalla(request, id):
    return render(request, 'batalla.html', {'id':id})
