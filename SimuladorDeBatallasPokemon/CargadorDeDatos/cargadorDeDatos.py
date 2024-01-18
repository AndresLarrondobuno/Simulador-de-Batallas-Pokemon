import requests
from ClasesAuxiliares.FormateadorDeStrings import FormateadorDeStrings

URL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon/'
URL_ESPECIES_POKEMON = 'https://pokeapi.co/api/v2/pokemon-species/'
URL_CADENA_EVOLUTIVA = 'https://pokeapi.co/api/v2/evolution-chain/'
URL_TIPOS = 'https://pokeapi.co/api/v2/type/'
URL_MOVIMIENTOS = 'https://pokeapi.co/api/v2/move/'
URL_ESTADISTICAS = 'https://pokeapi.co/api/v2/stat/'
URL_ITEMS = 'https://pokeapi.co/api/v2/item'
URL_IMAGENES_FRENTE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
URL_IMAGENES_ESPALDA = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/'


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


    def cargarDatosDeImagenes(metodoDeIdentificacion: int|str) -> dict:
        urlImagenesFrente = FormateadorDeStrings.formatearUrlDeImagenParaConsumirRecursoDeAPI(URL_IMAGENES_FRENTE, metodoDeIdentificacion)
        urlImagenesEspalda = FormateadorDeStrings.formatearUrlDeImagenParaConsumirRecursoDeAPI(URL_IMAGENES_ESPALDA, metodoDeIdentificacion)
        respuestaImagenFrente = requests.get(urlImagenesFrente)
        respuestaImagenEspalda = requests.get(urlImagenesEspalda)
        imagenes = {"imagenFrente": respuestaImagenFrente.content, "imagenEspalda": respuestaImagenEspalda.content}
        return imagenes