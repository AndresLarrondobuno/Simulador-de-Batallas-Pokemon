import os

class FormateadorDeStrings:

    @staticmethod
    def obtenerRutaAArchivo(nombreDeArchivo: str, rutaActual=None) -> str:
        if rutaActual is None:
            rutaActual = os.path.abspath(__file__)
            print(f"el archivo se encuentra en el directorio actual: {rutaActual}")

        rutaArchivoBuscado = os.path.join(rutaActual, nombreDeArchivo)

        if os.path.exists(rutaArchivoBuscado):
            print(f"el archivo fue encontrado en la ruta: {rutaArchivoBuscado}")
            return rutaArchivoBuscado

        directorioPadre = os.path.dirname(rutaActual)
        
        if directorioPadre == rutaActual:
            return None

        return FormateadorDeStrings.obtenerRutaAArchivo(nombreDeArchivo, directorioPadre)


    @staticmethod
    def formatearUrlParaConsumirRecursoDeAPI(url: str, metodoDeIdentificacion: int|str) -> str:
        #no se puede guardar en cookies para el usuario?
        if isinstance(metodoDeIdentificacion, int):
            url = os.path.join(url, str(metodoDeIdentificacion))
        elif isinstance(metodoDeIdentificacion, str):
            url = os.path.join(url, metodoDeIdentificacion)
        else:
            raise ValueError("El argumento debe ser un ID numérico o el nombre del recurso como string")
        return url