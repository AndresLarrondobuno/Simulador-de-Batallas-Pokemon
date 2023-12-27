from django.db import models
from Usuarios.models import PerfilUsuario

class EquipoPokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tamano = models.IntegerField(default=2)
    perfilUsuario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, null=True)