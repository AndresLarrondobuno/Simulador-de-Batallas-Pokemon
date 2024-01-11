import requests
from ClasesAuxiliares.FormateadorDeStrings import FormateadorDeStrings

URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/'
URL_ESPECIES_POKEMON = 'https://pokeapi.co/api/v2/pokemon-species/'
URL_CADENA_EVOLUTIVA = 'https://pokeapi.co/api/v2/evolution-chain/'
URL_TIPOS = f'https://pokeapi.co/api/v2/type/'
URL_MOVIMIENTOS = f'https://pokeapi.co/api/v2/move/'
URL_ESTADISTICAS = f'https://pokeapi.co/api/v2/stat/'
URL_ITEMS = f'https://pokeapi.co/api/v2/item'


class CargadorDeDatos:
    '''
    Trae desde pokeAPI la informacion de recursos en formato JSON
    '''

    def cargarDatosDePokemon(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_POKEMONS, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()


    def cargarDatosDeEspecie(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_ESPECIES_POKEMON, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()


    def cargarDatosDeCadenaEvolutiva(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_CADENA_EVOLUTIVA, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()


    def cargarDatosDeTipo(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_TIPOS, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()


    def cargarDatosDeMovimiento(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_MOVIMIENTOS, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()


    def cargarDatosDeEstadisticas(metodoDeIdentificacion: int|str) -> dict:
        url = FormateadorDeStrings.formatearUrlParaConsumirRecursoDeAPI(URL_ESTADISTICAS, metodoDeIdentificacion)
        respuesta = requests.get(url)
        return respuesta.json()