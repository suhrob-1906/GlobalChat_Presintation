from django.urls import path
from .profile_views import my_profile

urlpatterns = [
    path("me/", my_profile),
]