from typing import Any
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

class FomularioDeCreacionDeUsuario(UserCreationForm):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        
        self.fields['username'].label = "Nombre de Usuario"
        self.fields['password1'].label = "Contraseña"
        self.fields['password2'].label = "Confirmación de contraseña"

        self.fields['username'].help_text = "Requerido. Letras, digitos y @/./+/-/_ solamente."
        self.fields['password1'].help_text = "La contraseña debe ser una combinacion de caracteres y números"
        self.fields['password2'].help_text = "Repetí tu contraseña"


class FomularioDeAutenticacionDeUsuario(AuthenticationForm):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        
        self.fields['username'].label = "Nombre de Usuario"
        self.fields['password'].label = "Contraseña"

        self.fields['password'].help_text = "La contraseña debe ser una combinacion de caracteres y números."
