from django.db import models
from Pokemons.models import Pokemon, EspeciePokemon

class EquipoPokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tamano = models.IntegerField(default=3)
    pokemons = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
    especiesPokemon = models.ManyToManyField(EspeciePokemon)