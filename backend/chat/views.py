from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Server, Channel, Message
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    ServerSerializer,
    ChannelSerializer,
    MessageSerializer
)

@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_profile(request):
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_server(request):
    server = Server.objects.create(
        name=request.data["name"],
        owner=request.user
    )
    return Response(ServerSerializer(server).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_servers(request):
    servers = Server.objects.filter(owner=request.user)
    return Response(ServerSerializer(servers, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def server_channels(request, server_id):
    channels = Channel.objects.filter(server_id=server_id)
    return Response(ChannelSerializer(channels, many=True).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def messages(request):
    channel_id = request.GET.get("channel")
    qs = Message.objects.filter(channel_id=channel_id).order_by("created_at")
    return Response(MessageSerializer(qs, many=True).data)
