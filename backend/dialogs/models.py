from django.db import models
from django.contrib.auth.models import User


class Dialog(models.Model):
    user1 = models.ForeignKey(User, related_name="d1", on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name="d2", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)