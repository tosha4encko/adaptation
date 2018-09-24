from django.contrib.gis.db import models
from django.contrib.auth.models import User

from PIL import Image
from os import path

class TBProfile(User):
	post = models.CharField(max_length=100, null=True)
	subdivisions = models.CharField(max_length=50, null=True)
	mail = models.CharField(max_length=150, null=True)
	city_code = models.CharField(max_length=3)
	phone = models.CharField(max_length=7)

	image = models.ImageField(null=True, upload_to='profile_image')


	locaton = models.PointField(null=True)

	def save(self, *args, **kwargs):
		super(TBProfile, self).save(*args, **kwargs)

		_MAX_SIZE = 100
		# Проверяем, указан ли логотип
		if self.image:
			filepath = self.image.path
			width = self.image.width
			height = self.image.height

			max_size = max(width, height)

			if max_size > _MAX_SIZE:
				new_image = Image.open(filepath)
				new_image = new_image.resize(
					(round(width / max_size * _MAX_SIZE),
					 round(height / max_size * _MAX_SIZE)),
					Image.ANTIALIAS
				)
				new_image.save(filepath)

	def __str__(self):
		return str(self.id)

	def __unicode__(self):
		return str(self.id)

class Project(models.Model):
	name = models.CharField(max_length=50)
	repos = models.CharField(max_length=50)
	develop = models.ManyToManyField(TBProfile, )

