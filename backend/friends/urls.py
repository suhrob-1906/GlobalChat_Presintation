from django.urls import path
from .views import send_request, accept_request, my_friends,remove_friend

urlpatterns = [
    path("", my_friends),
    path("request/", send_request),
    path("accept/", accept_request),
    path("<int:friend_id>/", remove_friend),
]
