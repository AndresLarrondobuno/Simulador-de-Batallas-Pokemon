from django.urls import re_path
from .views import detalleBatalla

app_name = 'Batallas'


urlpatterns = [
    re_path(r'^(?P<id>[-\w]+)/$', detalleBatalla, name='detalleBatalla'),
]