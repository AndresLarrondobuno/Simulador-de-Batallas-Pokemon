from django.shortcuts import render

class BatallasController():

    def detalleBatalla(self, request, id):
        return render(request, 'batalla.html', {'id':id})


    def buscarBatalla(self, request):
        return render(request, "buscarBatalla.html")


    def elegirEquipo(self, request):
        pass