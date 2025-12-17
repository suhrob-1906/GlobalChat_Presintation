from django.db import models
from django.contrib.auth.models import User
from dialogs.models import Dialog


class Message(models.Model):
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    file = models.FileField(upload_to="messages/", blank=True, null=True)
    file_type = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)