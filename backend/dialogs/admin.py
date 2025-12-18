from django.contrib import admin
from .models import Dialog

@admin.register(Dialog)
class DialogAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "title", "created_at")
    filter_horizontal = ("members",)