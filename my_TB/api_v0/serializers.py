from rest_framework import serializers
from TB.models import TBProfile

from DataType.models import Data, Type

class TypeSerilizer(serializers.ModelSerializer):
	datas = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='data'
    )

	class Meta:
		model = Type
		fields = [
			'type',
			'datas'
		]

class TBPreviewSerializer(serializers.ModelSerializer):
   class Meta:
	   model = TBProfile
	   fields = [
			'id',
		    'first_name',
		    'last_name',
		    'city_code',
		    'phone',
		    'mail',
		    'image_url',
		    'post',
		    'subdivisions',
		    'latitude',
            'longitude'
	   ]


class TBDetailSerializer(serializers.ModelSerializer):
   class Meta:
	   model = TBProfile
	   fields = [
		   'id',
		   'first_name',
		   'last_name',
		   'city_code',
		   'phone',
		   'mail',
		   'image_url',
		   'post',
		   'subdivisions',
		   'latitude',
           'longitude'
	   ]