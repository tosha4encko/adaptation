from django.contrib.gis.db import models
from django.contrib.auth.models import User

class TBProfile(User):
	post = models.CharField(max_length=100, null=True)
	subdivisions = models.CharField(max_length=50, null=True)
	mail = models.CharField(max_length=150, null=True)
	image = models.ImageField(null=True, upload_to='profile_image')
	city_code = models.CharField(max_length=3) 
	phone = models.CharField(max_length=7)

	locaton = models.PointField(null=True)

	def __str__(self):
		return self.post