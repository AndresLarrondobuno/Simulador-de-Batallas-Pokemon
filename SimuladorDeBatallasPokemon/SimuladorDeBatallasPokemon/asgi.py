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
from Batallas.routing import websocket_urlpatterns


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SimuladorDeBatallasPokemon.settings')

# Obtener la aplicación Django para procesar solicitudes HTTP y WebSocket.
django_asgi_app = get_asgi_application()

# Configuración del enrutador de canales para manejar solicitudes WebSocket.
application = ProtocolTypeRouter({
    "http": django_asgi_app,  # Ruta predeterminada para solicitudes HTTP normales.
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
            # Aquí debes definir tus rutas de WebSocket y el consumidor correspondiente.
            # Ejemplo:
            # path("ws/batalla/<str:room_name>/", BatallaConsumer.as_asgi()),
        )
    ),
})
