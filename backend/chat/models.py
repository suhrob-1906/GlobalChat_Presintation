from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel_id = models.IntegerField()
    text = models.TextField(blank=True)
    file = models.FileField(upload_to="messages/", null=True, blank=True)
    file_type = models.CharField(max_length=10, blank=True)
    voice_duration = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
