from django.db import models
from django.contrib.auth.models import User

class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Channel(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
