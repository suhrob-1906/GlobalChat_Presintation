from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User


@api_view(["GET"])
def search_users(request):
    q = request.GET.get("q", "")
    users = User.objects.filter(username__icontains=q)[:20]

    result = []
    for user in users:
        profile = user.userprofile
        result.append({
            "id": user.id,
            "username": user.username,
            "nickname": profile.nickname,
            "avatar": profile.avatar.url if profile.avatar else None,
        })

    return Response(result)
