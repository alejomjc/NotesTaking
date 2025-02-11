from django.db import models
from users.models import CustomUser

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    category = models.CharField(max_length=50)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
