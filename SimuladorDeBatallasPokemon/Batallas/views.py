from django.shortcuts import render
from .models import Batalla, Invitacion
from Usuarios.models import User, PerfilUsuario
from Equipos.models import EquipoPokemon
from django.http import JsonResponse
from django.db import models
from django.forms.models import model_to_dict
import json

batallas = {}

class SerializadorDeModelos():
    def serializar_equipo(modelo_equipo: models.Model) -> dict:
        modelos_pokemons = modelo_equipo.pokemon_set.all()
        datos_pokemons_serializados = []
        for modelo_pokemon in modelos_pokemons:
            pokemon_serializado = SerializadorDeModelos.serializar_pokemon(modelo_pokemon)
            datos_pokemons_serializados.append(pokemon_serializado)
        return json.dumps(datos_pokemons_serializados)


    def serializar_pokemon(modelo_pokemon: models.Model) -> dict:
        datos_modelo_pokemon = model_to_dict(modelo_pokemon)
        datos_modelo_pokemon['movimientos'] = [SerializadorDeModelos.serializar_movimiento(movimiento) for movimiento in modelo_pokemon.movimientos.all()]
        return datos_modelo_pokemon


    def serializar_movimiento(modelo_movimiento: models.Model):
        return model_to_dict(modelo_movimiento)


class BatallasController():
    def guardar_eleccion_de_accion_de_batalla(self, request):
        datos = json.loads(request.body)
        id_batalla = datos['idBatalla']
        rol_usuario = datos['rolUsuario']
        informacion_de_orden = datos['informacionDeOrden']
        
        default = {
            "datos_orden_usuario_solicitante": None,
            "datos_orden_usuario_destinatario": None,
        }
        
        if not batallas.get(id_batalla):
            batallas[id_batalla] = default   
        
        datos_orden_usuario_solicitante_asignada = batallas[id_batalla]['datos_orden_usuario_solicitante']
        datos_orden_usuario_destinatario_asignada = batallas[id_batalla]['datos_orden_usuario_destinatario']
        
        #si la request viene del usuario solicitante
        if rol_usuario == 'solicitante' and (not datos_orden_usuario_solicitante_asignada):
            batallas[id_batalla]['datos_orden_usuario_solicitante'] = informacion_de_orden
        elif rol_usuario == 'destinatario' and (not datos_orden_usuario_destinatario_asignada):
            batallas[id_batalla]['datos_orden_usuario_destinatario'] = informacion_de_orden
        else:
            print('Este usuario ya eligio su accion.')

        datos_orden_usuario_solicitante_asignada = batallas[id_batalla]['datos_orden_usuario_solicitante']
        datos_orden_usuario_destinatario_asignada = batallas[id_batalla]['datos_orden_usuario_destinatario']
        
        print("batallas: ", batallas)
        
        #comunicar el estado de la batalla (el estado de la eleccion de cada usuario)
        return JsonResponse(batallas[id_batalla], safe=False)


    def batalla(self, request, id):
        batalla = Batalla.objects.get(id=id)
        perfil_usuario_solicitante = batalla.usuario_solicitante
        perfil_usuario_destinatario = batalla.usuario_destinatario

        modelo_equipo_solicitante = batalla.equipo_solicitante
        modelo_equipo_destinatario = batalla.equipo_destinatario

        usuario_actual = request.user
        usuario_solicitante = perfil_usuario_solicitante.usuario
        usuario_destinatario = perfil_usuario_destinatario.usuario
        
        if usuario_actual == usuario_solicitante:
            rol_usuario = 'solicitante'
            datos_equipo_usuario_actual = SerializadorDeModelos.serializar_equipo(modelo_equipo_solicitante)
        elif usuario_actual == usuario_destinatario:
            rol_usuario = 'destinatario'
            datos_equipo_usuario_actual = SerializadorDeModelos.serializar_equipo(modelo_equipo_destinatario)
        else:
            print("El usuario no pertenece a esta batalla.")
        

        contexto = {
            'id':id,
            'usuario_solicitante': perfil_usuario_solicitante,
            'usuario_destinatario': perfil_usuario_destinatario,
            'modelo_equipo_solicitante': modelo_equipo_solicitante,
            'modelo_equipo_destinatario': modelo_equipo_destinatario,
            'datos_equipo_usuario_actual': datos_equipo_usuario_actual,
            'datos_equipo_usuario_solicitante': SerializadorDeModelos.serializar_equipo(modelo_equipo_solicitante),
            'datos_equipo_usuario_destinatario': SerializadorDeModelos.serializar_equipo(modelo_equipo_destinatario),
            'rol_usuario': rol_usuario,
        }

        return render(request, 'batalla.html', contexto)


    def crear_batalla(self, request):
        if request.method == 'POST':
            datos = json.loads(request.body)
            idInvitacion = datos["idInvitacion"]
            invitacion = Invitacion.objects.get(id=idInvitacion)

            batalla = Batalla(
                activa = True,
                usuario_solicitante = invitacion.usuario_solicitante,
                usuario_destinatario = invitacion.usuario_destinatario,
                equipo_solicitante = invitacion.equipo_solicitante,
                equipo_destinatario = invitacion.equipo_destinatario,
            )
            batalla.save()
        
        return JsonResponse({'idBatalla': batalla.id}, safe=False)


    def crear_invitacion_a_batalla(self, request):
        datos = json.loads(request.body)
        usuario_solicitante = request.user
        usuario_solicitante = PerfilUsuario.objects.get(usuario=usuario_solicitante)


        nombre_usuario_destinatario = datos['nombreOponente']
        usuario_destinatario = User.objects.get(username=nombre_usuario_destinatario)
        usuario_destinatario = PerfilUsuario.objects.get(usuario=usuario_destinatario)

        idEquipoSolicitante = datos['idEquipoSolicitante']
        equipo_solicitante = EquipoPokemon.objects.get(id=idEquipoSolicitante)

        invitacion = Invitacion.objects.create(
            aceptada= False,
            usuario_solicitante= usuario_solicitante,
            usuario_destinatario= usuario_destinatario,
            equipo_solicitante = equipo_solicitante,
        )        
        invitacion.save()
        print("Invitacion guardada en DB.")
        return render(request, "index.html")
    

    def consultar_invitaciones_pendientes(self, request):
        if request.method == "GET":
            id_usuario = request.user.id
            invitacionesPendientes = Invitacion.objects.filter(usuario_destinatario_id=id_usuario, aceptada=False)
            poseeInvitacionesPendientes = invitacionesPendientes.exists()

            if poseeInvitacionesPendientes:
                return JsonResponse(True, safe=False)
            else:
                return JsonResponse(False, safe=False)
            

    def consultar_invitaciones_aceptadas(self, request):
        if request.method == "GET":
            id_usuario = request.user.id
            invitacionesAceptadas = Invitacion.objects.filter(usuario_destinatario_id=id_usuario, aceptada=True)
            poseeInvitacionesAceptadas = invitacionesAceptadas.exists()

            if poseeInvitacionesAceptadas:
                return JsonResponse(True, safe=False)
            else:
                return JsonResponse(False, safe=False)
        

    def mostrar_invitaciones_pendientes(self, request):
        if request.method == "GET":
            usuario = request.user
            id_usuario = usuario.id
            invitacionesPendientes = Invitacion.objects.filter(usuario_destinatario_id=id_usuario, aceptada=False)

            contexto = {"invitacionesPendientes":invitacionesPendientes}


            if request.path == "/equipos/":
                return render(request, 'equipos.html', {contexto})
            
            elif request.path == "/batallas/invitaciones_pendientes/":
                perfilUsuario = PerfilUsuario.objects.get(usuario=usuario)
                contexto['usuario'] = perfilUsuario
                return render(request, "invitacionesPendientes.html", contexto)
            

    def consultar_batallas_pendientes(self, request):
        if request.method == "GET":
            usuario = request.user
            id_usuario = usuario.id
            batallasPendientes = Batalla.objects.filter(usuario_solicitante_id=id_usuario, activa=True)

            contexto = {"batallasPendientes":batallasPendientes}

            perfilUsuario = PerfilUsuario.objects.get(usuario=usuario)
            contexto['usuario'] = perfilUsuario

            poseeBatallasPendientes = batallasPendientes.exists()

            if poseeBatallasPendientes:
                idsBatallasPendientes = [batalla.id for batalla in batallasPendientes]
                print(idsBatallasPendientes)
                return JsonResponse({"idsBatallasPendientes":idsBatallasPendientes}, safe=False)
            else:
                return JsonResponse(False, safe=False)
        
        

    def aceptar_invitacion(self, request):
        if request.method == "POST":
            datos = json.loads(request.body)
            idInvitacion = datos["id"]
            idEquipoDestinatario = datos['idEquipoDestinatario']
            print("id invitacion: ", idInvitacion)

            invitacion = Invitacion.objects.get(id=idInvitacion)
            equipoDestinatario = EquipoPokemon.objects.get(id=idEquipoDestinatario)

            invitacion.aceptada = True
            invitacion.equipo_destinatario = equipoDestinatario

            invitacion.save()
            print("invitacion: ", invitacion)
            print("idEquipoDestinatario: ", idEquipoDestinatario)

            
        return render(request, "index.html")