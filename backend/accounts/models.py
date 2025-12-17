from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    bio = models.CharField(max_length=160, blank=True)
    about = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.nickname
