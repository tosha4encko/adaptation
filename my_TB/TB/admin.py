from django.contrib import admin
from .models import TBProfile

class ProfileAdmin(admin.ModelAdmin):
    fields = ('first_name',
              'last_name',
              'city_code',
              'phone',
              'mail',
              'image_url',
              'post',
              'subdivisions',
              'latitude',
              'longitude')

admin.site.register(TBProfile, ProfileAdmin)

# admin.site.register(TBProfile)