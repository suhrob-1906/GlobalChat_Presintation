from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Авторизация
    path("register/", views.register, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    
    # Профиль
    path("me/", views.me, name="get_me"),
    path("profile/me/", views.me, name="get_profile_me"),
    path("profile/me/update/", views.update_profile, name="update_profile"),
    
    # Поиск
    path("users/search/", views.search_users, name="search_users"),
    
    # Прочее
    path("ping/", views.ping, name="ping"),
]