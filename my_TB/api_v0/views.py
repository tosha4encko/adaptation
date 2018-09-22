from TB.models import TBProfile
from DataType.models import Data, Type
from .serializers import TBDetailSerializer, TBPreviewSerializer, TypeSerilizer

from rest_framework import mixins
from rest_framework import generics

class TypeList(mixins.ListModelMixin,
               mixins.CreateModelMixin,
               generics.GenericAPIView):

    queryset = Type.objects.all()
    serializer_class = TypeSerilizer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if request.data['data'] != '' and request.data['type'] != '':
            type = Type.objects.get(type = request._data['type'])
            data = Data(data=request._data['data'], data_type=type)
            data.save()
            # return self.create(request, *args, **kwargs)

class SnipetList(mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 generics.GenericAPIView):

    queryset = TBProfile.objects.all()
    serializer_class = TBPreviewSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class SnippetDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = TBProfile.objects.all()
    serializer_class = TBDetailSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

















