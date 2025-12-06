from rest_framework import viewsets
from .models import EmojiUsage
from .serializers import EmojiUsageSerializer

# Create your views here.
class EmojiUsageViewSet(viewsets.ModelViewSet):
    queryset = EmojiUsage.objects.all()
    serializer_class = EmojiUsageSerializer
