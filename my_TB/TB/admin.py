from django.contrib.gis import admin

from .models import TBProfile

class ProfileAdmin(admin.OSMGeoAdmin):
    default_lon = 4422232
    default_lat = 5985350
    default_zoom = 12
    fields = ('username',
              'locaton',
              'first_name',
              'last_name',
              'city_code',
              'phone',
              'mail',
              'image',
              'post',
              'subdivisions'
              )



admin.site.register(TBProfile, ProfileAdmin)

# admin.site.register(TBProfile)