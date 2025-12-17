from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Server, Channel, Message


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = UserProfile
        fields = ("user_id", "username", "nickname", "phone", "bio", "avatar")


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = "__all__"


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.profile.nickname")

    class Meta:
        model = Message
        fields = ("id", "user", "text", "created_at", "channel_id")
