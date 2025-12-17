from django.urls import path

from .views import register, login, me
from .profile_views import my_profile
from .user_views import search_users

urlpatterns = [
    # AUTH
    path("register/", register),
    path("login/", login),
    path("me/", me),

    # PROFILE
    path("profile/me/", my_profile),

    # USERS
    path("users/search/", search_users),
]