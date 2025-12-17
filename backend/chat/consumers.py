import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room = "global"
        await self.channel_layer.group_add(self.room, self.channel_name)
        await self.accept()

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room,
            {
                "type": "chat_message",
                "message": text_data
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=event["message"])
