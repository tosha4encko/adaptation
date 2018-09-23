from django.contrib.gis import admin
from django.urls import path
from django.conf.urls import url, include

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/v0/', include('api_v0.urls')),
    url(r'^synch/', include('TB.urls')),
    url(r'^', include('main.urls')),
]
