from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer
from dialogs.models import Dialog


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def messages(request):
    # GET messages by dialog
    if request.method == "GET":
        dialog_id = request.GET.get("dialog")
        if not dialog_id:
            return Response({"detail": "dialog is required"}, status=400)

        qs = Message.objects.filter(
            dialog_id=dialog_id
        ).order_by("created_at")

        return Response(MessageSerializer(qs, many=True).data)

    # POST new message
    dialog = Dialog.objects.get(id=request.data["dialog"])

    msg = Message.objects.create(
        dialog=dialog,
        user=request.user,
        text=request.data.get("text", ""),
        file=request.FILES.get("file"),
        file_type=request.data.get("file_type", ""),
    )

    return Response(MessageSerializer(msg).data, status=201)