from django.contrib.gis import admin

from .models import TBProfile, Project


class ProfileInline(admin.TabularInline):
    model = Project.develop.through

class ProfileAdmin(admin.OSMGeoAdmin):
    default_lon = 4422232
    default_lat = 5985350
    default_zoom = 12
    inlines = [ProfileInline]
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
    inlines = [ProfileInline]
    fields = ('name', 'repos')


admin.site.register(TBProfile, ProfileAdmin)
admin.site.register(Project, ProjectsAdmin)
# admin.site.register(Project)