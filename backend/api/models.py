from django.db import models

# Create your models here.
class EmojiEntry(models.Model):
    """
    This model represents the emoji entry.
    Fields:
        date: unique date for each emoji
        emoji: emoji entry in char
        created_at: logs the entry creation time
        updated_at: logs the last update time
    """
    date = models.DateField()
    emoji = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)


    def __str__(self):
        return f"{self.date} - {self.emoji}"
