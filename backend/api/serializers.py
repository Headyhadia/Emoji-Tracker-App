from rest_framework import serializers
from .models import EmojiUsage

class EmojiUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmojiUsage
        fields = ['id', 'emoji', 'count']