from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async

User = get_user_model()

@database_sync_to_async
def get_user(token):
    try:
        return User.objects.get(id=AccessToken(token)["user_id"])
    except:
        return AnonymousUser()

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        qs = parse_qs(scope["query_string"].decode())
        scope["user"] = await get_user(qs.get("token", [None])[0])
        return await super().__call__(scope, receive, send)
