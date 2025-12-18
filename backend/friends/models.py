from django.db import models
from django.contrib.auth.models import User


class Friend(models.Model):
    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
    )

    from_user = models.ForeignKey(
        User,
        related_name="sent_requests",
        on_delete=models.CASCADE
    )
    to_user = models.ForeignKey(
        User,
        related_name="received_requests",
        on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("from_user", "to_user")

    def __str__(self):
        return f"{self.from_user} → {self.to_user} ({self.status})"
