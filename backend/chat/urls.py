from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (
    index,
    register,
    me,
    upload_avatar,
    messages,
    my_servers,
    create_server,
    server_channels,
)

urlpatterns = [
    path("", index),

    path("api/auth/register/", register),
    path("api/auth/login/", TokenObtainPairView.as_view()),
    path("api/auth/me/", me),

    path("api/profile/avatar/", upload_avatar),

    path("api/servers/", my_servers),
    path("api/servers/create/", create_server),
    path("api/servers/<int:server_id>/channels/", server_channels),

    path("api/messages/", messages),
]
