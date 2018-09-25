from django.http import HttpResponse
from .synch import synch_from_geonet, synch_from_ORISI

def geodom_synch(request):
    synch_from_geonet()
    synch_from_ORISI()
    return HttpResponse("synchronize successful ")

