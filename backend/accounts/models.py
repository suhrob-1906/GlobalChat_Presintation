from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    nickname = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    bio = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    last_seen = models.DateTimeField(default=timezone.now)

    def is_online(self):
        return (timezone.now() - self.last_seen).seconds < 60

    def __str__(self):
        return self.nickname