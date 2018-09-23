from django.contrib.gis import admin
from django.urls import path
from django.conf.urls import url, include

from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/v0/', include('api_v0.urls')),
    url(r'^synch/', include('TB.urls')),
    url(r'^$', include('main.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
