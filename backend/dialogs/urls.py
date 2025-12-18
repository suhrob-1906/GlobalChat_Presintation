from django.urls import path
from . import views

urlpatterns = [
    path("", views.dialogs_list),
    path("create/", views.create_dialog),
    path("<int:pk>/", views.dialog_detail),
]