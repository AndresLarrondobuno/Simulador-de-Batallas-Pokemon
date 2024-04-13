from django import template

register = template.Library()

@register.filter
def concatenar_strings(valor_1, valor_2):
    return str(valor_1) + str(valor_2)