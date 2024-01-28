import subprocess
import os
import shutil

directorioInserciones = os.getcwd()
directorioAppPrincipal = os.path.dirname(directorioInserciones)

rutasASubdirectorios = [os.path.join(directorioAppPrincipal, directorio) for directorio in os.listdir(directorioAppPrincipal)]
subdirectorios = [os.listdir(ruta) for ruta in rutasASubdirectorios if os.path.isdir(ruta)]

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

comandoMakemigrations = ["py", "manage.py", "makemigrations"]

comandoMakemigrationsPokemonsApp = ["py", "manage.py", "makemigrations", 'Pokemons']

comandoMakeMigrationsEquiposApp = ["py", "manage.py", "makemigrations", 'Equipos']

comandoMakeMigrationsUsuariosApp = ["py", "manage.py", "makemigrations", 'Usuarios']

comandoMakeMigrationsBatallasApp = ["py", "manage.py", "makemigrations", 'Batallas']

comandoMigrate = ["py", "manage.py", "migrate"]

comandoMigratePokemonsApp = ["py", "manage.py", "migrate", 'Pokemons']

comandoMigrateCreacionDeEquiposApp = ["py", "manage.py", "migrate", 'Equipos']

comandoMigrateUsuariosApp = ["py", "manage.py", "migrate", 'Usuarios']

comandoMigrateBatallasApp = ["py", "manage.py", "migrate", 'Batallas']

comandoEfectuarInserciones = ['py', 'efectuarInsercionesABaseDeDatos.py' ]

os.chdir(directorioAppPrincipal)

subprocess.run(comandoMakemigrations, cwd=directorioAppPrincipal)
subprocess.run(comandoMakemigrationsPokemonsApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMakeMigrationsEquiposApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMakeMigrationsUsuariosApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMakeMigrationsBatallasApp, cwd=directorioAppPrincipal)

subprocess.run(comandoMigrate, cwd=directorioAppPrincipal)
subprocess.run(comandoMigratePokemonsApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMigrateCreacionDeEquiposApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMigrateUsuariosApp, cwd=directorioAppPrincipal)
subprocess.run(comandoMigrateBatallasApp, cwd=directorioAppPrincipal)

subprocess.run(comandoEfectuarInserciones, cwd=directorioInserciones)