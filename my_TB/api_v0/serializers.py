from rest_framework_gis.serializers import GeoFeatureModelSerializer
from TB.models import TBProfile

class TBPreviewSerializer(GeoFeatureModelSerializer):
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