import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class BatallaConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'test'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )


        self.accept()

        text_data=json.dumps({
            'type':'conexion_establecida',
            'message':'Ahora estas conectado'
        })

        self.send(text_data)


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        mensaje = text_data_json['mensaje']


        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'mensajeDeChat',
                'message':mensaje
            }
        )
    
    def mensajeDeChat(self, event):
        mensaje = event['message']

        respuestaJSON = json.dumps({
            'type':'chat',
            'message': mensaje
        })

        self.send(text_data=respuestaJSON)


