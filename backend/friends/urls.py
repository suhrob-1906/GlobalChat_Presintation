from django.urls import path
from . import views

urlpatterns = [
    path("", views.friends_list),
    path("request/", views.send_request),
    path("accept/", views.accept_request),
    path("<int:pk>/", views.remove_friend),
]