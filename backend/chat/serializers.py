from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")

    class Meta:
        model = Message
        fields = ("id", "user", "channel", "text", "created_at")
from .models import Server, Channel, Message


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ("id", "name")


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ("id", "name", "type", "server")


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")

    class Meta:
        model = Message
        fields = ("id", "user", "text", "created_at", "channel_id")
