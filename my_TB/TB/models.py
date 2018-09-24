from django.contrib.gis.db import models
from django.contrib.auth.models import User

class TBProfile(User):
	post = models.CharField(max_length=100, null=True)
	subdivisions = models.CharField(max_length=50, null=True)
	mail = models.CharField(max_length=150, null=True)
	city_code = models.CharField(max_length=3)
	phone = models.CharField(max_length=7)

	image = models.ImageField(null=True, upload_to='profile_image')
	locaton = models.PointField(null=True)

	def __str__(self):
		return str(self.id)

	def __unicode__(self):
		return str(self.id)

class Project(models.Model):
	name = models.CharField(max_length=50)
	develop = models.ManyToManyField(TBProfile, )

