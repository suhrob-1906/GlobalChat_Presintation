from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q

from .models import Dialog
from .serializers import DialogSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_dialogs(request):
    dialogs = Dialog.objects.filter(
        Q(user1=request.user) | Q(user2=request.user)
    )
    return Response(DialogSerializer(dialogs, many=True).data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dialog_detail(request, dialog_id=None):
    if request.method == "POST":
        dialog, _ = Dialog.objects.get_or_create(
            user1=request.user,
            user2_id=request.data["user_id"]
        )
        return Response(DialogSerializer(dialog).data)

    dialog = Dialog.objects.get(id=dialog_id)
    return Response(DialogSerializer(dialog).data)