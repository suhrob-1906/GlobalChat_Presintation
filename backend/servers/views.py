from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Server, Channel
from .serializers import ServerSerializer, ChannelSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_servers(request):
    servers = Server.objects.filter(owner=request.user)
    return Response(ServerSerializer(servers, many=True).data)

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
def server_channels(request, server_id):
    channels = Channel.objects.filter(server_id=server_id)
    return Response(ChannelSerializer(channels, many=True).data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_server(request, server_id):
    server = Server.objects.get(id=server_id, owner=request.user)
    serializer = ServerSerializer(
        server,
        data=request.data,
        partial=True
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
