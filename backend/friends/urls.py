from django.urls import path
from .views import send_request, accept_request, my_friends

urlpatterns = [
    path("request/", send_request),
    path("accept/", accept_request),
    path("", my_friends),
]