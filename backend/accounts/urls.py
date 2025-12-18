from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path("register/", views.register),
    path("login/", TokenObtainPairView.as_view()),
    path("me/", views.me),

    path("profile/me/", views.me),
    path("profile/me/update/", views.update_profile),

    path("users/search/", views.search_users),
    path("ping/", views.ping),
]