from django.db import models
from django.contrib.auth.models import User


class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario.username
    
    @property
    def tieneAlmenosUnEquipo(self):
        print()
        print()
        print("tiene equipos:", self.equipopokemon_set.exists())
        print()
        print()
        return self.equipopokemon_set.exists()