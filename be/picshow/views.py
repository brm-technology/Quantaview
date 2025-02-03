from rest_framework import viewsets
from .models import Picture
from .serializers import PictureSerializer

class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
