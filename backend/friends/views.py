from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FriendRequest
from .serializers import FriendSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_request(request):
    fr = FriendRequest.objects.create(
        from_user=request.user,
        to_user_id=request.data["user_id"]
    )
    return Response(FriendSerializer(fr).data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def accept_request(request):
    fr = FriendRequest.objects.get(id=request.data["request_id"])
    fr.status = "accepted"
    fr.save()
    return Response(FriendSerializer(fr).data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_friends(request):
    friends = FriendRequest.objects.filter(
        to_user=request.user,
        status="accepted"
    )
    return Response(FriendSerializer(friends, many=True).data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_friend(request, friend_id):
    FriendRequest.objects.filter(
        id=friend_id,
        status="accepted"
    ).delete()
    return Response({"status": "deleted"})
