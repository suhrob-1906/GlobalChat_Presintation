from django.urls import path
from .views import my_friends, send_request, accept_request, remove_friend

urlpatterns = [
    path("", my_friends),
    path("request/", send_request),
    path("accept/", accept_request),
    path("<int:pk>/", remove_friend),
]