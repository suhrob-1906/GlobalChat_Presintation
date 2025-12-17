from rest_framework import serializers
from .models import FriendRequest


class FriendSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()

    class Meta:
        model = FriendRequest
        fields = ["id", "from_user", "to_user", "status", "created_at"]

    def _user(self, user):
        p = user.userprofile
        return {
            "id": user.id,
            "nickname": p.nickname,
            "avatar": p.avatar.url if p.avatar else None,
        }

    def get_from_user(self, obj):
        return self._user(obj.from_user)

    def get_to_user(self, obj):
        return self._user(obj.to_user)