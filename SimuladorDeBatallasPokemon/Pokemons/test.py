from django.test import TestCase
from .models import Pokemon, EspeciePokemon, Movimiento

class PokemonModelTest(TestCase):
    def setUp(self):
        movimientoUno = Movimiento(
            nombre= "tackle",
            tipo="normal",
            potencia="20",
            precision="100"
        )

        movimientoDos = Movimiento(
            nombre= "trueno",
            tipo="electric",
            potencia="80",
            precision="75"
        )

        movimientoTres = Movimiento(
            nombre= "rayo hielo",
            tipo="ice",
            potencia="75",
            precision="100"
        )

        movimientoCuatro = Movimiento(
            nombre= "burbujas",
            tipo="normal",
            potencia="10",
            precision="100"
        )


        especie = EspeciePokemon.objects.create(
            nombre = "Pikachu",
            tipoPrincipal = "Normal",
            tipoSecundario = "Flying"

        )

'''   pokemon = Pokemon.objects.create(
            nombre = ,
            nombre = ,
            nombre = ,
            nombre = ,
            nombre = ,
        )
'''