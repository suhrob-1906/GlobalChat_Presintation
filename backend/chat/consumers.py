import json
from django.contrib.auth.models import AnonymousUser
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "global_chat"
        self.user = self.scope["user"]

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # если пользователь не авторизован — игнор
        if isinstance(self.user, AnonymousUser):
            return

        data = json.loads(text_data)

        # ожидаем: channel_id и text
        message = await self.save_message(
            user=self.user,
            channel_id=data["channel_id"],
            text=data["text"],
        )

        # отправляем всем в группе
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": {
                    "id": message.id,
                    "user": self.user.username,
                    "channel_id": message.channel_id,
                    "text": message.text,
                    "created_at": message.created_at.isoformat(),
                },
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event["message"]))

    @database_sync_to_async
    def save_message(self, user, channel_id, text):
        return Message.objects.create(
            user=user,
            channel_id=channel_id,
            text=text,
        )
