from django.core.management.base import BaseCommand
from datetime import date, timedelta
from api.models import EmojiEntry
import random

EMOJIS = ["happy", "good", "neutral", "sad", "angry"]
today = date.today()

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(30):
            day = today - timedelta(days=i)

            EmojiEntry.objects.update_or_create(
                date=day,
                defaults={"emoji": random.choice(EMOJIS)}
            )
