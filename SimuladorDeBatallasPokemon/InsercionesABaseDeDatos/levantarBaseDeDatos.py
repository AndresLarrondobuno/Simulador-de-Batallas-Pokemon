import subprocess
import os

directorioProyecto = r"C:\\programacion\\BatallasPokemonMVC\\SimuladorDeBatallasPokemon"

directorioInserciones = directorioProyecto + r'\InsercionesABaseDeDatos'

comandoMakemigrations = ["py", "manage.py", "makemigrations"]

comandoMakemigrationsPokemonsApp = ["py", "manage.py", "makemigrations", 'Pokemons']

comandoMakeMigrationsEquiposApp = ["py", "manage.py", "makemigrations", 'Equipos']

comandoMakeMigrationsUsuariosApp = ["py", "manage.py", "makemigrations", 'Usuarios']

comandoMigrate = ["py", "manage.py", "migrate"]

comandoMigratePokemonsApp = ["py", "manage.py", "migrate", 'Pokemons']

comandoMigrateCreacionDeEquiposApp = ["py", "manage.py", "migrate", 'Equipos']

comandoMigrateUsuariosApp = ["py", "manage.py", "migrate", 'Usuarios']

comandoEfectuarInserciones = ['py', 'efectuarInsercionesABaseDeDatos.py' ]

os.chdir(directorioProyecto)

subprocess.run(comandoMakemigrations, cwd=directorioProyecto)
subprocess.run(comandoMakemigrationsPokemonsApp, cwd=directorioProyecto)
subprocess.run(comandoMakeMigrationsEquiposApp, cwd=directorioProyecto)
subprocess.run(comandoMakeMigrationsUsuariosApp, cwd=directorioProyecto)

subprocess.run(comandoMigrate, cwd=directorioProyecto)
subprocess.run(comandoMigratePokemonsApp, cwd=directorioProyecto)
subprocess.run(comandoMigrateCreacionDeEquiposApp, cwd=directorioProyecto)
subprocess.run(comandoMigrateUsuariosApp, cwd=directorioProyecto)

subprocess.run(comandoEfectuarInserciones, cwd=directorioInserciones)