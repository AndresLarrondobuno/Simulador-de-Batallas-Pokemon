
class FormateadorDeDatos:

    @staticmethod
    def formatearDatosDePokemon(datosPokemon: dict) -> dict:
        datosFormateados = dict()
        datosDeTiposFormateados = FormateadorDeDatos.formatearDatosDeTipos(datosPokemon['types'])
        datosDeEstadisticasFormateados = FormateadorDeDatos.formatearDatosDeEstadisticas(datosPokemon['stats'])
        nombresDeMovimientosAdquiribles = FormateadorDeDatos.obtenerNombresDeMovimientosAdquiriblesDe(datosPokemon)


        datosFormateados['nombre'] = datosPokemon['name']
        datosFormateados['tipoPrincipal'] = datosDeTiposFormateados['tipoPrincipal']
        datosFormateados['tipoSecundario'] = datosDeTiposFormateados['tipoSecundario']
        datosFormateados['vida'] = datosDeEstadisticasFormateados['vida']
        datosFormateados['ataque'] = datosDeEstadisticasFormateados['ataque']
        datosFormateados['defensa'] = datosDeEstadisticasFormateados['defensa']
        datosFormateados['ataqueEspecial'] = datosDeEstadisticasFormateados['ataqueEspecial']
        datosFormateados['defensaEspecial'] = datosDeEstadisticasFormateados['defensaEspecial']
        datosFormateados['velocidad'] = datosDeEstadisticasFormateados['velocidad']
        datosFormateados['movimientos'] = nombresDeMovimientosAdquiribles
        datosFormateados['imagenes'] = datosPokemon['imagenes']
        return datosFormateados

    
    @staticmethod
    def formatearDatosDeMovimiento(datosMovimiento: dict) -> dict:
        datosFormateados = dict()
        datosFormateados['nombre'] = datosMovimiento['name']
        datosFormateados['potencia'] = datosMovimiento['power']
        datosFormateados['precision'] = datosMovimiento['accuracy']
        datosFormateados['tipo'] = datosMovimiento['type']['name']
        return datosFormateados
    

    @staticmethod
    def formatearDatosDeEstadisticas(datosEstadisticas: list) -> dict:
        datosFormateados = dict()
        datosFormateados['vida'] = datosEstadisticas[0]['base_stat']
        datosFormateados['ataque'] = datosEstadisticas[1]['base_stat']
        datosFormateados['defensa'] = datosEstadisticas[2]['base_stat']
        datosFormateados['ataqueEspecial'] = datosEstadisticas[3]['base_stat']
        datosFormateados['defensaEspecial'] = datosEstadisticas[4]['base_stat']
        datosFormateados['velocidad'] = datosEstadisticas[5]['base_stat']
        return datosFormateados


    @staticmethod
    def formatearDatosDeTipos(datosTipos: list) -> dict:
        datosFormateados = dict()
        datosFormateados['tipoPrincipal'] = datosTipos[0]['type']['name']
        if len(datosTipos) == 2:
            datosFormateados['tipoSecundario'] = datosTipos[1]['type']['name']
        else:
            datosFormateados['tipoSecundario'] = None
        return datosFormateados


    def obtenerNombresDeMovimientosAdquiriblesDe(datosPokemon: dict) -> list:
        datosMovimientos = datosPokemon['moves']
        movimientosAdquiribles = []

        for datosMovimiento in datosMovimientos:
            nombre = datosMovimiento['move']['name']
            movimientosAdquiribles.append(nombre)
        return movimientosAdquiribles
