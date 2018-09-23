from rest_framework.routers import DefaultRouter
from .views import *


from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^TB/$', SnipetList.as_view()),
    url(r'^TB/(?P<pk>[0-9]+)$', SnippetDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)