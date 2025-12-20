from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils import timezone

from .serializers import RegisterSerializer, ProfileSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    """Регистрация нового пользователя"""
    serializer = RegisterSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": ProfileSerializer(user.profile).data
    }, status=HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    """Логин пользователя (используется TokenObtainPairView)"""
    return Response({"error": "Use /api/auth/login/ endpoint"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    """Получить текущего пользователя"""
    profile = request.user.profile
    profile.last_seen = timezone.now()
    profile.save(update_fields=["last_seen"])
    return Response(ProfileSerializer(profile).data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Обновить профиль"""
    profile = request.user.profile
    serializer = ProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_users(request):
    """Поиск пользователей"""
    q = request.GET.get("q", "").strip()
    
    if len(q) < 2:
        return Response([])
    
    # Поиск по username и nickname
    users = User.objects.filter(username__icontains=q)[:20]
    profiles = [u.profile for u in users if hasattr(u, "profile")]
    
    return Response(ProfileSerializer(profiles, many=True).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ping(request):
    """Обновить последний раз онлайна"""
    profile = request.user.profile
    profile.last_seen = timezone.now()
    profile.save(update_fields=["last_seen"])
    return Response({"status": "ok"})