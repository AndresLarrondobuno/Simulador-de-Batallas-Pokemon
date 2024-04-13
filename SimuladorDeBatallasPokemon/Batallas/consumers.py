import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BatallaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        room_id = self.scope['url_route']['kwargs']['id']
        username = str(self.scope['user'])
        self.room_name = f'room_{username}'
        self.room_group_name = f'batalla_{room_id}'
        print("conexion desde: " + username)

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
        mensaje = datos_deserializados['message']
        tipo = datos_deserializados['type']

        contexto = {
            'type': tipo,
            'message': mensaje,
        }

        if tipo == 'relatoDeAccionDeBatalla':
            await self.send(json.dumps(contexto))
            
        elif tipo == 'mensajeDeUsuario':
            username = datos_deserializados['username']
            contexto['username'] = username
            await self.channel_layer.group_send(
                self.room_group_name,
                contexto
            )

        elif tipo == 'actualizacionDeEstadoDeBatalla':
            await self.channel_layer.group_send(
                self.room_group_name,
                contexto
            )

    #(3) maneja mensajes con type "mensajeDeUsuario"
    async def mensajeDeUsuario(self, event):
        mensaje = event['message']
        username_emisor = event['username']

        print(f"metodo mensajeDeUsuario ejecutado: {mensaje} / consumidor asociado a: {self.scope['user']}")
        
        mensajeMarcado = f'{username_emisor}: {mensaje}'

        respuestaJSON = json.dumps({
            'type':'mensajeDeUsuario',
            'message': mensajeMarcado,
            'username':username_emisor,
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

        await self.send(respuestaJSON)
        
        

    async def actualizacionDeEstadoDeBatalla(self, event):
        actualizaciones_de_batalla = event['message']
        print(f"metodo actualizacionDeEstadoDeBatalla ejecutado, consumidor asociado a: {self.scope['user']}")

        respuestaJSON = json.dumps({
            'type':'actualizacionDeEstadoDeBatalla',
            'message': actualizaciones_de_batalla,
        })

        await self.send(text_data=respuestaJSON)