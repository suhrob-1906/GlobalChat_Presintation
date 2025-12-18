from django.db import models
from django.contrib.auth.models import User
from dialogs.models import Dialog


class Message(models.Model):
    FILE_IMAGE = "image"
    FILE_VIDEO = "video"
    FILE_AUDIO = "audio"
    FILE_VOICE = "voice"

    FILE_TYPE_CHOICES = (
        (FILE_IMAGE, "Image"),
        (FILE_VIDEO, "Video"),
        (FILE_AUDIO, "Audio"),
        (FILE_VOICE, "Voice"),
    )

    dialog = models.ForeignKey(
        Dialog,
        related_name="messages",
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User,
        related_name="messages",
        on_delete=models.CASCADE
    )

    text = models.TextField(blank=True)
    file = models.FileField(upload_to="messages/", blank=True, null=True)
    file_type = models.CharField(
        max_length=10,
        choices=FILE_TYPE_CHOICES,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} in dialog {self.dialog_id}"