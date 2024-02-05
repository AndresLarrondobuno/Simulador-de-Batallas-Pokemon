from django.urls import re_path
from .consumers import BatallaConsumer


websocket_urlpatterns = [
    re_path(r'ws/batallas/(?P<id>[-\w]+)/$', BatallaConsumer.as_asgi()),
]