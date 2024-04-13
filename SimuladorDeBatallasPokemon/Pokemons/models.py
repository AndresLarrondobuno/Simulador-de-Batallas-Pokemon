import os
if __name__ == '__main__':
    os.environ['DJANGO_SETTINGS_MODULE'] = 'SimuladorDeBatallasPokemon.SimuladorDeBatallasPokemon.settings'
    import django
    django.setup()

from django.db import models
from Equipos.models import EquipoPokemon
from PIL import Image
from io import BytesIO
import base64
from django.template.defaultfilters import slugify


class Movimiento(models.Model):
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    potencia = models.IntegerField(default=100)
    precision = models.IntegerField(default=100)

    slug = models.SlugField()

    def __str__(self) -> str:
        return self.nombre.title()
    

    def save(self, *args, **kwargs):
        if not self.slug:  # Si el slug no está definido
            self.slug = slugify(self.nombre)  # Generar slug basado en el nombre
        super().save(*args, **kwargs)


class EspeciePokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tipoPrincipal = models.CharField(max_length=50)
    tipoSecundario = models.CharField(max_length=50)

    vidaBase = models.IntegerField(default=200)
    ataqueBase = models.IntegerField(default=50)
    defensaBase = models.IntegerField(default=30)
    ataqueEspecialBase = models.IntegerField(default=50)
    defensaEspecialBase = models.IntegerField(default=30)
    velocidadBase = models.IntegerField(default=100)

    movimientos = models.ManyToManyField(Movimiento)

    slug = models.SlugField()

    imagenFrente  = models.BinaryField(null=True, blank=True)
    imagenEspalda  = models.BinaryField(null=True, blank=True)


    def __str__(self) -> str:
        return self.nombre.title()
    

    def save(self, *args, **kwargs):
        if not self.slug:  # Si el slug no está definido
            self.slug = slugify(self.nombre)  # Generar slug basado en el nombre
        super().save(*args, **kwargs)


    def _obtenerImagen(self, contenidoBinario, porcentaje=None) -> str:
        if contenidoBinario:
            imagen = Image.open(BytesIO(contenidoBinario))
            if porcentaje:
                ancho, alto = imagen.size
                nuevo_ancho = int(ancho * (porcentaje / 100))
                nuevo_alto = int(alto * (porcentaje / 100))
                imagen = imagen.resize((nuevo_ancho, nuevo_alto))

            buffer = BytesIO()
            imagen.save(buffer, format='PNG')
            imgStr = base64.b64encode(buffer.getvalue()).decode('utf-8')
            return imgStr
    

    def obtenerImagenFrente(self):
        return self._obtenerImagen(self.imagenFrente)
    

    def obtenerIcono(self):
        return self._obtenerImagen(self.imagenFrente, porcentaje=75)
    

    def _obtenerNombre(self):
        return self.nombre.title()
    


class Pokemon(models.Model):
    nombre = models.CharField(max_length=50)
    tipoPrincipal = models.CharField(max_length=50)
    tipoSecundario = models.CharField(max_length=50)

    vida = models.IntegerField(default=100)
    ataque = models.IntegerField(default=100)
    defensa = models.IntegerField(default=100)
    ataqueEspecial = models.IntegerField(default=100)
    defensaEspecial = models.IntegerField(default=100)
    velocidad = models.IntegerField(default=100)

    nivel = models.IntegerField(default=100)

    especie = models.ForeignKey(EspeciePokemon, on_delete=models.CASCADE, null=True)
    equipo = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, null=True)
    movimientos = models.ManyToManyField(Movimiento)


    def obtener_nombre(self):
        return self.nombre.title()