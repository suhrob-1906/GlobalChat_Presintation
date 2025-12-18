from rest_framework import serializers
from .models import Message
from accounts.serializers import ProfileSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(
        source="sender.profile",
        read_only=True
    )

    class Meta:
        model = Message
        fields = (
            "id",
            "dialog",
            "sender",
            "text",
            "file",
            "file_type",
            "created_at",
        )
        read_only_fields = ("id", "sender", "created_at")