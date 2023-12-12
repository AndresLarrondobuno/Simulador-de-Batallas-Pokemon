import subprocess
import os

directorioProyecto = r"C:\\programacion\\BatallasPokemonMVC\\SimuladorDeBatallasPokemon"

directorioInserciones = directorioProyecto + r'\InsercionesABaseDeDatos'

comandoMakemigrations = ["py", "manage.py", "makemigrations"]

comandoMakemigrationsPokemonsApp = ["py", "manage.py", "makemigrations", 'Pokemons']

comandoMakeMigrationsCreacionDeEquiposApp = ["py", "manage.py", "makemigrations", 'Equipos']

comandoMigrate = ["py", "manage.py", "migrate"]

comandoMigratePokemonsApp = ["py", "manage.py", "migrate", 'Pokemons']

comandoMigrateCreacionDeEquiposApp = ["py", "manage.py", "migrate", 'Equipos']

comandoEfectuarInserciones = ['py', 'efectuarInsercionesABaseDeDatos.py' ]

os.chdir(directorioProyecto)

subprocess.run(comandoMakemigrations, cwd=directorioProyecto)
subprocess.run(comandoMakemigrationsPokemonsApp, cwd=directorioProyecto)
subprocess.run(comandoMakeMigrationsCreacionDeEquiposApp, cwd=directorioProyecto)
subprocess.run(comandoMigrate, cwd=directorioProyecto)
subprocess.run(comandoMigratePokemonsApp, cwd=directorioProyecto)
subprocess.run(comandoMigrateCreacionDeEquiposApp, cwd=directorioProyecto)
subprocess.run(comandoEfectuarInserciones, cwd=directorioInserciones)