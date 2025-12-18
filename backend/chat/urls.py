from django.urls import path
from . import views

urlpatterns = [
    path("", views.messages_list),
    path("send/", views.send_message),
]