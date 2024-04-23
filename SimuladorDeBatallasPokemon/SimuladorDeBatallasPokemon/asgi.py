"""
ASGI config for SimuladorDeBatallasPokemon project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from Batallas.routing import websocket_urlpatterns_batallas


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SimuladorDeBatallasPokemon.settings')

# obtener la aplicación Django para procesar solicitudes HTTP y WebSocket.
django_asgi_app = get_asgi_application()

# configuracion del enrutador de canales para manejar solicitudes WebSocket.
application = ProtocolTypeRouter({
    "http": django_asgi_app,  # ruta predeterminada para solicitudes HTTP normales.
    "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns_batallas
        )
    ),
    )
})