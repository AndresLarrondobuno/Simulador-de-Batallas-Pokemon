from django.db import models
from Usuarios.models import PerfilUsuario
from Equipos.models import EquipoPokemon

class Batalla(models.Model):
    activa = models.BooleanField()

    usuario_solicitante = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="batallas_solicitadas")
    usuario_destinatario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="batallas_recibidas")

    equipo_solicitante = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, related_name="batallas_como_solicitante")
    equipo_destinatario = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, related_name="batallas_como_receptor")

    usuario_ganador = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, null=True, related_name="batallas_ganadas")
    usuario_perdedor = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, null=True, related_name="batallas_perdidas")


class Invitacion(models.Model):
    aceptada = models.BooleanField()
    usuario_solicitante = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="invitaciones_solicitadas")
    usuario_destinatario = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name="invitaciones_recibidas")

    equipo_solicitante = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, related_name="invitaciones_como_solicitante")
    equipo_destinatario = models.ForeignKey(EquipoPokemon, on_delete=models.CASCADE, related_name="invitaciones_como_destinatario", null=True)


    def __str__(self) -> str:
        estado = "aceptada" if self.aceptada else "pendiente"
        return f"Invitacion de {self.usuario_solicitante.usuario.username.upper()} en estado '{estado.upper()}'."