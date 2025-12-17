from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    username = models.CharField(max_length=32, unique=True)
    nickname = models.CharField(max_length=32)
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.user.id})"


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_servers")

    def __str__(self):
        return self.name


class Channel(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="channels")
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
