from django import forms
from .models import EquipoPokemon

class FormularioDeCreacionDeEquipo(forms.ModelForm):
    class Meta:
        model = EquipoPokemon
        fields = ('nombre', 'tamano', 'pokemons')