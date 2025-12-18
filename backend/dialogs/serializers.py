from rest_framework import serializers
from .models import Dialog
from accounts.serializers import ProfileSerializer


class DialogSerializer(serializers.ModelSerializer):
    members = ProfileSerializer(
        source="members.profile",
        many=True,
        read_only=True
    )

    class Meta:
        model = Dialog
        fields = (
            "id",
            "type",
            "title",
            "members",
            "created_at",
        )
