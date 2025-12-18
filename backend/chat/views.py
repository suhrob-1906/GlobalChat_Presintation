from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from dialogs.models import Dialog
from .models import Message
from .serializers import MessageSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def messages_list(request):
    dialog_id = request.GET.get("dialog_id")

    if not dialog_id:
        return Response({"error": "dialog_id required"}, status=400)

    dialog = Dialog.objects.get(id=dialog_id, members=request.user)
    messages = Message.objects.filter(dialog=dialog).order_by("created_at")

    return Response(MessageSerializer(messages, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_message(request):
    dialog_id = request.data.get("dialog")
    text = request.data.get("text", "")
    file = request.FILES.get("file")
    file_type = request.data.get("file_type", "")

    dialog = Dialog.objects.get(id=dialog_id, members=request.user)

    message = Message.objects.create(
        dialog=dialog,
        sender=request.user,
        text=text,
        file=file,
        file_type=file_type
    )

    return Response(MessageSerializer(message).data)