from django.urls import path
from .views import my_dialogs, dialog_detail

urlpatterns = [
    path("", my_dialogs),
    path("<int:dialog_id>/", dialog_detail),
    ]
