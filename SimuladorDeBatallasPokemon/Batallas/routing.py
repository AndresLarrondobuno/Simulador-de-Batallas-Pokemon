from django.urls import re_path
from .consumers import BatallaConsumer


websocket_urlpatterns_batallas = [
    re_path(r'ws/batallas/batalla_(?P<id>[-\w]+)/$', BatallaConsumer.as_asgi()),    
]