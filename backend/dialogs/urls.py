from django.urls import path
from .views import get_or_create_dialog

urlpatterns = [
    path("", get_or_create_dialog),
]
