import json
from channels.generic.websocket import AsyncWebsocketConsumer

class BatallaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'batalla_{self.room_name}'
        print("conexion desde: " + str(self.scope['user']))

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        text_data=json.dumps({
            'type':'conexion_establecida',
            'message':'Ahora estas conectado'
        })

        await self.send(text_data)


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        mensaje = text_data_json['mensaje']
        username = self.scope['user'].username

        mensajeMarcado = f'{username}: {mensaje}'
        print("metodo receive ejecutado: " + mensajeMarcado)
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'mensajeDeChat',
                'username':username,
                'message':mensajeMarcado,
            }
        )


    async def mensajeDeChat(self, event):
        mensaje = event['message']
        print(f"metodo mensajeDeChat ejecutado: {mensaje} / consumidor asociado a: {self.scope['user']}")


        respuestaJSON = json.dumps({
            'type':'chat',
            'message': mensaje
        })

        await self.send(text_data=respuestaJSON)