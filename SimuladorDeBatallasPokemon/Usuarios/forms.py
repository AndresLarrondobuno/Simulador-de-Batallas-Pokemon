from django import forms
from django.contrib.auth.models import User

class FomularioDeCreacionDeUsuario(forms.Form):
    nombre_usuario = forms.CharField(label="Nombre de Usuario")

    contrasena = forms.CharField(
        label= "Contraseña",
        strip= False,
        widget= forms.PasswordInput,
        help_text= "La contraseña debe tener almenos 8 caracteres y debe ser una combinación de letras y números."
        )
    
    confirmacion_contrasena = forms.CharField(
        label= "Confirmación de Contraseña",
        strip= False,
        widget= forms.PasswordInput,
        help_text= "Volve a ingresar tu contraseña."
        )

    class Meta:
        model = User
        fields = ['nombre_usuario', 'contrasena', 'confirmacion_contrasena']
