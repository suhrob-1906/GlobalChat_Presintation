from django.db import models
from django.contrib.auth.models import User


class Dialog(models.Model):
    TYPE_DM = "DM"
    TYPE_GROUP = "GROUP"

    TYPE_CHOICES = (
        (TYPE_DM, "Direct"),
        (TYPE_GROUP, "Group"),
    )

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(max_length=100, blank=True)
    members = models.ManyToManyField(User, related_name="dialogs")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.type == self.TYPE_DM:
            return f"DM {self.id}"
        return self.title or f"Group {self.id}"