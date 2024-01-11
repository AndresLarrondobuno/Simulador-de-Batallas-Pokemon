import random

class GeneradorDeValoresAlAzar:

    def obtenerNumeroEntero(comienzo: int, fin: int) -> int:
        '''incluye ambos extremos'''
        numero = random.randint(comienzo, fin)
        return numero
    

    def obtenerMuestra(poblacion: list, tamanoDeMuestra: int):
        try:
            return random.sample(poblacion, tamanoDeMuestra)
        except ValueError:
            cantidadDeValoresDefaultAAgregar = tamanoDeMuestra - len(poblacion)
            valoresDefault = [None for _ in range(cantidadDeValoresDefaultAAgregar)]
            poblacionRellenadaConValoresDefault = poblacion + valoresDefault
            return poblacionRellenadaConValoresDefault
    

    def obtenerElemento(poblacion: list):
        return random.choice(poblacion)
    

    def rollExitoso(porcentaje: int) -> bool:
        enteroAlAzar = GeneradorDeValoresAlAzar.obtenerNumeroEntero(1, 100)
        if enteroAlAzar in range(1, porcentaje + 1):
            return True
        else:
            return False