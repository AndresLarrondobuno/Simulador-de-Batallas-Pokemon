from django.db import models
from django.contrib.auth.models import User
from Batallas.models import Batalla


class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    batallas = models.ManyToManyField(Batalla, blank=True)

    def __str__(self):
        return self.usuario.username