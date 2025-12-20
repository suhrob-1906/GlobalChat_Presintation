from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    nickname = serializers.CharField(required=False, allow_blank=True)
    bio = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ("username", "password", "nickname", "bio", "phone", "avatar")

    def create(self, validated_data):
        # Извлекаем дополнительные поля
        nickname = validated_data.pop("nickname", "")
        bio = validated_data.pop("bio", "")
        phone = validated_data.pop("phone", "")
        avatar = validated_data.pop("avatar", None)

        # Создаём пользователя
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )

        # Обновляем профиль
        profile = user.profile
        profile.nickname = nickname
        profile.bio = bio
        profile.phone = phone
        if avatar:
            profile.avatar = avatar
        profile.save()

        return user


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    is_online = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "user_id",
            "id",
            "username",
            "nickname",
            "avatar",
            "bio",
            "phone",
            "last_seen",
            "is_online",
        )
        read_only_fields = ("user_id", "username", "last_seen", "is_online")

    def get_is_online(self, obj):
        return obj.is_online()