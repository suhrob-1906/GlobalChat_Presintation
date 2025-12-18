from rest_framework import serializers
from .models import Friend
from accounts.serializers import ProfileSerializer


class FriendSerializer(serializers.ModelSerializer):
    from_user = ProfileSerializer(source="from_user.profile", read_only=True)
    to_user = ProfileSerializer(source="to_user.profile", read_only=True)

    class Meta:
        model = Friend
        fields = (
            "id",
            "from_user",
            "to_user",
            "status",
            "created_at",
        )