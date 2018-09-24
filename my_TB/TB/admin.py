from django.contrib.gis import admin

from .models import TBProfile, Project

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

class ProjectsAdmin(admin.ModelAdmin):
    inlines = [ProfileAdmin]
    fields = ('name')


admin.site.register(TBProfile, ProfileAdmin)
# admin.site.register(Project, ProjectsAdmin)
admin.site.register(Project)