from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils import timezone

from .serializers import RegisterSerializer, ProfileSerializer


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(ProfileSerializer(request.user.profile).data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    serializer = ProfileSerializer(
        request.user.profile,
        data=request.data,
        partial=True
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_users(request):
    q = request.GET.get("q", "")
    users = User.objects.filter(username__icontains=q)[:20]
    profiles = [u.profile for u in users if hasattr(u, "profile")]
    return Response(ProfileSerializer(profiles, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ping(request):
    profile = request.user.profile
    profile.last_seen = timezone.now()
    profile.save(update_fields=["last_seen"])
    return Response({"status": "ok"})