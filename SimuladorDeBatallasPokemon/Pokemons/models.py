import os
if __name__ == '__main__':
    os.environ['DJANGO_SETTINGS_MODULE'] = 'SimuladorDeBatallasPokemon.SimuladorDeBatallasPokemon.settings'
    import django
    django.setup()

from django.db import models
from Equipos.models import EquipoPokemon

class Movimiento(models.Model):
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    potencia = models.IntegerField(default=100)
    precision = models.IntegerField(default=100)

    slug = models.SlugField()


class EspeciePokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tipoPrincipal = models.CharField(max_length=50)
    tipoSecundario = models.CharField(max_length=50)

    vidaBase = models.IntegerField(default=200)
    ataqueBase = models.IntegerField(default=50)
    defensaBase = models.IntegerField(default=30)
    ataqueEspecialBase = models.IntegerField(default=50)
    defensaEspecialBase = models.IntegerField(default=30)
    velocidadBase = models.IntegerField(default=100)

    movimientos = models.ManyToManyField(Movimiento)

    slug = models.SlugField()


class Pokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tipoPrincipal = models.CharField(max_length=50)
    tipoSecundario = models.CharField(max_length=50)

    vida = models.IntegerField(default=100)
    ataque = models.IntegerField(default=100)
    defensa = models.IntegerField(default=100)
    ataqueEspecial = models.IntegerField(default=100)
    defensaEspecial = models.IntegerField(default=100)
    velocidad = models.IntegerField(default=100)

    nivel = models.IntegerField(default=100)
    especie = models.ForeignKey(EspeciePokemon, on_delete=models.CASCADE, null=True)
    equipo = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, null=True)

    movimientos = models.ManyToManyField(Movimiento)