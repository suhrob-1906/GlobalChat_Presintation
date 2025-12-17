from django.urls import path
from .views import my_servers, create_server, server_channels, update_server

urlpatterns = [
    path("", my_servers),
    path("create/", create_server),
    path("<int:server_id>/channels/", server_channels),
    path("<int:server_id>/update/", update_server),
]