from django.urls import re_path
from .consumers import BatallaConsumer

websocket_urlpatterns = [
    re_path(r'ws/socket-server/', BatallaConsumer.as_asgi()),
]