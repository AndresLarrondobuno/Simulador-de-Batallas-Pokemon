import os
import shutil

directorioInserciones = os.getcwd()
directorioAppPrincipal = os.path.dirname(directorioInserciones)

walk = [(root,dirs,files) for root,dirs,files in os.walk(directorioAppPrincipal)]

for root,dirs,files in walk:
    for dir in dirs:
        if "migrations" in dir:
            path = os.path.join(root,dir)
            shutil.rmtree(path)
            print(f"ruta de archivo eliminado: {path}")
            print()

rutaABaseDeDatos = r"C:\programacion\BatallasPokemonMVC\SimuladorDeBatallasPokemon\db.sqlite3"

if os.path.exists(rutaABaseDeDatos):
    os.remove(rutaABaseDeDatos)