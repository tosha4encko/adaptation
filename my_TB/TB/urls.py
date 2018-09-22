from .views import *
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^', geodom_synch)
]

urlpatterns = format_suffix_patterns(urlpatterns)