from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Count

from .models import Dialog
from .serializers import DialogSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dialogs_list(request):
    dialogs = Dialog.objects.filter(members=request.user)
    return Response(DialogSerializer(dialogs, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_dialog(request):
    dialog_type = request.data.get("type")
    member_ids = request.data.get("members", [])
    title = request.data.get("title", "")

    if dialog_type not in [Dialog.TYPE_DM, Dialog.TYPE_GROUP]:
        return Response({"error": "invalid dialog type"}, status=400)

    if dialog_type == Dialog.TYPE_DM:
        if len(member_ids) != 1:
            return Response({"error": "DM requires exactly 1 member"}, status=400)

        other_user = User.objects.get(id=member_ids[0])

        existing = Dialog.objects.filter(
            type=Dialog.TYPE_DM,
            members=request.user
        ).filter(
            members=other_user
        ).annotate(count=Count("members")).filter(count=2).first()

        if existing:
            return Response(DialogSerializer(existing).data)

        dialog = Dialog.objects.create(type=Dialog.TYPE_DM)
        dialog.members.add(request.user, other_user)
        return Response(DialogSerializer(dialog).data)

    # GROUP
    dialog = Dialog.objects.create(
        type=Dialog.TYPE_GROUP,
        title=title
    )
    dialog.members.add(request.user)
    for uid in member_ids:
        dialog.members.add(User.objects.get(id=uid))

    return Response(DialogSerializer(dialog).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dialog_detail(request, pk):
    dialog = Dialog.objects.get(id=pk, members=request.user)
    return Response(DialogSerializer(dialog).data)
