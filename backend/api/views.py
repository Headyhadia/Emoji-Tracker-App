from rest_framework import viewsets
from .models import EmojiEntry
from .serializers import EmojiEntrySerializer

# Create your views here.
class EmojiEntryViewSet(viewsets.ModelViewSet):
    serializer_class = EmojiEntrySerializer

# Request aware filtering. Entries are returned for specified month (date range) sorted by date in ascending.
    def get_queryset(self):
        queryset = EmojiEntry.objects.all()

        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date and end_date:
            queryset = queryset.filter(date__range = [start_date, end_date])

        return queryset.order_by("date")
