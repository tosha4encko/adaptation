from django.db import models
from django.contrib.auth.models import User

class TBProfile(User):
	post = models.CharField(max_length=100, null=True)
	subdivisions = models.CharField(max_length=50)
	mail = models.TextField(max_length=150, null=True)
	image_url = models.TextField(max_length=150, null=True)
	city_code = models.CharField(max_length=3) 
	phone = models.CharField(max_length=7)

	latitude = models.FloatField(null=True)
	longitude = models.FloatField(null=True)

	def __str__(self):
		return self.post