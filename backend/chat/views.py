from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser

from django.contrib.auth.models import User
import cloudinary.uploader

from .models import UserProfile, Message, Server, Channel, Membership
from .serializers import (
    RegisterSerializer,
    MessageSerializer,
    ServerSerializer,
    ChannelSerializer,
)


def index(request):
    return JsonResponse({"status": "backend ok"})


# 🔐 REGISTER
@csrf_exempt
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=201)

    return Response(serializer.errors, status=400)


# 👤 ME
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    profile = request.user.profile
    return Response({
        "username": request.user.username,
        "avatar": profile.avatar,
    })


# 🖼 AVATAR UPLOAD
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_avatar(request):
    file = request.FILES.get("avatar")
    if not file:
        return Response({"error": "No file"}, status=400)

    result = cloudinary.uploader.upload(
        file,
        folder="avatars",
        transformation=[{"width": 128, "height": 128, "crop": "fill"}],
    )

    profile = request.user.profile
    profile.avatar = result["secure_url"]
    profile.save()

    return Response({"avatar": profile.avatar})


# 💬 MESSAGES
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def messages(request):
    channel_id = request.GET.get("channel_id")
    qs = Message.objects.filter(channel_id=channel_id).order_by("created_at")
    return Response(MessageSerializer(qs, many=True).data)


# 🏠 SERVERS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_servers(request):
    servers = Server.objects.filter(membership__user=request.user)
    return Response(ServerSerializer(servers, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_server(request):
    server = Server.objects.create(
        name=request.data["name"],
        owner=request.user
    )
    Membership.objects.create(user=request.user, server=server)
    return Response(ServerSerializer(server).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def server_channels(request, server_id):
    channels = Channel.objects.filter(server_id=server_id)
    return Response(ChannelSerializer(channels, many=True).data)
