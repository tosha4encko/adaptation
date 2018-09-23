from rest_framework_gis.serializers import GeoFeatureModelSerializer
from TB.models import TBProfile

class TBPreviewSerializer(GeoFeatureModelSerializer):
  def get_image(self, instance): 
    return instance.image.url if instance.image else ''  

  class Meta:
	  model = TBProfile
	  geo_field = "locaton"
	  fields = [
			'id',
	    'first_name',
	    'last_name',
	    'city_code',
	    'phone',
	    'mail',
	    'post',
	    'subdivisions',
	    'image'
	   ]

class TBDetailSerializer(GeoFeatureModelSerializer):
  def get_image(self, instance): 
    return instance.image.url if instance.image else ''  

  class Meta:
	  model = TBProfile
	  geo_field = "locaton"
	  fields = [
	    'id',
	    'first_name',
		   'last_name',
		   'city_code',
		   'phone',
		   'mail',
		   'post',
		   'subdivisions',
		   'image'
	   ]