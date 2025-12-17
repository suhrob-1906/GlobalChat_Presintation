from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "dialog",
            "user",
            "text",
            "file",
            "file_type",
            "created_at",
        ]

    def get_user(self, obj):
        p = obj.user.userprofile
        return {
            "id": obj.user.id,
            "nickname": p.nickname,
            "avatar": p.avatar.url if p.avatar else None,
        }