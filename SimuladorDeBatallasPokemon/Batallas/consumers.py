import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BatallaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'batalla_{self.room_name}'
        print("conexion desde: " + str(self.scope['user']))

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

        text_data=json.dumps({
            'type':'conexion_establecida',
            'message':'Ahora estas conectado',
        })

        await self.send(text_data)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

    #(2) recibe un json con datos del cliente
    async def receive(self, text_data):
        datos_deserializados = json.loads(text_data)
        mensaje = datos_deserializados['mensaje']
        tipo = datos_deserializados['type']

        contexto = {
            'type': tipo,
            'message': mensaje,
        }

        await self.channel_layer.group_send(
            self.room_group_name,
            contexto,
        )

    #(3) maneja mensajes con type "mensajeDeUsuario"
    async def mensajeDeUsuario(self, event):
        mensaje = event['message']
        username = self.scope['user'].username

        print(f"metodo mensajeDeUsuario ejecutado: {mensaje} / consumidor asociado a: {self.scope['user']}")
        
        mensajeMarcado = f'{username}: {mensaje}'

        respuestaJSON = json.dumps({
            'type':'mensajeDeUsuario',
            'message': mensajeMarcado,
            'username':username,
        })

        await self.send(text_data=respuestaJSON)

    #(3) maneja mensajes con type "mensajeDeServidor"
    async def relatoDeAccionDeBatalla(self, event):
        mensaje = event['message']
        print(f"metodo relatoDeAccionDeBatalla ejecutado: {mensaje} / consumidor asociado a: {self.scope['user']}")

        respuestaJSON = json.dumps({
            'type':'relatoDeAccionDeBatalla',
            'message': mensaje,
        })

        await self.send(text_data=respuestaJSON)