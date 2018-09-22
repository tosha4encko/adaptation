from django.db import models

# Create your models here.
class Type(models.Model):
    type = models.CharField(max_length=50)
    def __unicode__(self):
        return '%s'%(self.type)

    def __str__(self):
        return self.type


class Data(models.Model):
    data = models.CharField(max_length=50)
    data_type = models.ForeignKey(Type, related_name='datas', on_delete=models.CASCADE)

    def __unicode__(self):
        return '%s!!!'%(self.data)

    def __str__(self):
        return self.data

    class Meta:
        unique_together = ('data_type', 'data')
        ordering = ['data_type']
