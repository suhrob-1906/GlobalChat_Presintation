from rest_framework import serializers
from .models import FriendRequest

class FriendSerializer(serializers.ModelSerializer):
    from_user = serializers.CharField(source="from_user.username")
    to_user = serializers.CharField(source="to_user.username")

    class Meta:
        model = FriendRequest
        fields = ["id", "from_user", "to_user", "status"]