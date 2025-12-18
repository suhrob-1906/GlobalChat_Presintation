from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Friend
from .serializers import FriendSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def friends_list(request):
    qs = Friend.objects.filter(
        status=Friend.STATUS_ACCEPTED
    ).filter(
        from_user=request.user
    ) | Friend.objects.filter(
        status=Friend.STATUS_ACCEPTED,
        to_user=request.user
    )

    return Response(FriendSerializer(qs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_request(request):
    user_id = request.data.get("user_id")

    if not user_id:
        return Response({"error": "user_id required"}, status=400)

    if int(user_id) == request.user.id:
        return Response({"error": "cannot add yourself"}, status=400)

    to_user = User.objects.get(id=user_id)

    friend, created = Friend.objects.get_or_create(
        from_user=request.user,
        to_user=to_user
    )

    if not created:
        return Response({"error": "request already exists"}, status=400)

    return Response(FriendSerializer(friend).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def accept_request(request):
    request_id = request.data.get("request_id")

    friend = Friend.objects.get(
        id=request_id,
        to_user=request.user,
        status=Friend.STATUS_PENDING
    )

    friend.status = Friend.STATUS_ACCEPTED
    friend.save()

    return Response(FriendSerializer(friend).data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_friend(request, pk):
    Friend.objects.filter(id=pk).filter(
        from_user=request.user
    ).delete()

    Friend.objects.filter(id=pk).filter(
        to_user=request.user
    ).delete()

    return Response({"status": "deleted"})