from rest_framework import serializers
from .models import EmojiEntry

class EmojiEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmojiEntry
        fields = ['id', 'date', 'emoji']

    """  //UPSERT//
        Override create(); DRF default: POST -> always create a new row
        This create: POST -> create OR update
    """

    def create(self, validated_data): # Validated_data -> python dict containing clean, validated input
        date = validated_data.get("date") 
        emoji = validated_data.get("emoji")

        entry, created = EmojiEntry.objects.update_or_create(
            date=date, # lookup condition. “Is there already an EmojiEntry with this date?”
            defaults={"emoji": emoji}
        )

        return entry