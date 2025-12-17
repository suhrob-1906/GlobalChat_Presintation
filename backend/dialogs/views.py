from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Dialog
from .serializers import DialogSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_or_create_dialog(request):
    dialog, _ = Dialog.objects.get_or_create(
        user1=request.user,
        user2_id=request.data["user_id"]
    )
    return Response(DialogSerializer(dialog).data)