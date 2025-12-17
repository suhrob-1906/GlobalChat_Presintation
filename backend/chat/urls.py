from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import *

urlpatterns = [
    path("api/auth/register/", register),
    path("api/auth/login/", TokenObtainPairView.as_view()),

    path("api/profile/me/", my_profile),
    path("api/profile/update/", update_profile),

    path("api/servers/create/", create_server),
    path("api/servers/", my_servers),
    path("api/servers/<int:server_id>/channels/", server_channels),

    path("api/messages/", messages),
]
