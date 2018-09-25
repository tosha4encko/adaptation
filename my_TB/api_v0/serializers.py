from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework.serializers import PrimaryKeyRelatedField, ModelSerializer

from TB.models import TBProfile, Project

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
			'image',
		]

class ProjSerializer(ModelSerializer):
	develop = PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = Project
		fields = ('id', 'name', 'repos', 'develop')