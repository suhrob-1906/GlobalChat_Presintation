from django.contrib import admin
from .models import Friend

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ("id", "from_user", "to_user", "status", "created_at")