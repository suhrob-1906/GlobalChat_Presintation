import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if isinstance(self.scope["user"], AnonymousUser):
            await self.close()
            return
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        msg = await self.save(
            self.scope["user"],
            data["channel_id"],
            data["text"]
        )
        await self.send(json.dumps({
            "user": msg.user.profile.nickname,
            "text": msg.text,
            "channel_id": msg.channel_id
        }))

    @database_sync_to_async
    def save(self, user, channel_id, text):
        return Message.objects.create(
            user=user,
            channel_id=channel_id,
            text=text
        )
