from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    is_online = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "user_id",
            "username",
            "nickname",
            "avatar",
            "bio",
            "phone",
            "last_seen",
            "is_online",
        )

    def get_is_online(self, obj):
        return obj.is_online()