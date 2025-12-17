from django.urls import path
from .user_views import search_users

urlpatterns = [
    path("search/", search_users),
]