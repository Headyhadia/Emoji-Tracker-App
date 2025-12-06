from django.db import models

# Create your models here.
class EmojiUsage(models.Model):
    emoji = models.CharField(max_length=10)
    count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.emoji}: {self.count}"
