from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer

@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def my_profile(request):
    profile = request.user.userprofile

    if request.method == "PATCH":
        serializer = UserProfileSerializer(
            profile, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

    return Response(UserProfileSerializer(profile).data)