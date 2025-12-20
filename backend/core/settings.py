from pathlib import Path
import os
from datetime import timedelta
from django.core.exceptions import ImproperlyConfigured

# ==================================================
# BASE
# ==================================================

BASE_DIR = Path(__file__).resolve().parent.parent


def env(key, default=None):
    return os.environ.get(key, default)


# ==================================================
# SECURITY / ENV
# ==================================================

# Default to DEBUG=True for local development unless explicitly disabled
DEBUG = env("DEBUG", "True") == "True"

# Support both DJANGO_SECRET_KEY and SECRET_KEY (Render uses SECRET_KEY by default)
SECRET_KEY = env("DJANGO_SECRET_KEY") or env("SECRET_KEY")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured("DJANGO_SECRET_KEY or SECRET_KEY environment variable is required")
    SECRET_KEY = "dev-unsafe-key-change-me"

ALLOWED_HOSTS = env(
    "ALLOWED_HOSTS",
    "localhost,127.0.0.1,globalchat-presintation.render.com"
).split(",")
ALLOWED_HOSTS = [h for h in [h.strip() for h in ALLOWED_HOSTS] if h]

# Trusted origins for CSRF (helpful when using https)
CSRF_TRUSTED_ORIGINS = [f"https://{h}" for h in ALLOWED_HOSTS if h and h != "localhost"]

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
USE_X_FORWARDED_HOST = True


# ==================================================
# APPLICATIONS
# ==================================================

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "channels",
    "drf_spectacular",

    # Local apps
    "accounts.apps.AccountsConfig",
    "dialogs.apps.DialogsConfig",
    "chat.apps.ChatConfig",
    "friends.apps.FriendsConfig",
    "servers",
]


# ==================================================
# MIDDLEWARE
# ==================================================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS
# In development it's often convenient to allow all origins. In production
# provide FRONTEND_URLS env var (comma-separated) or set CORS_ALLOWED_ORIGINS.
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
else:
    CORS_ALLOW_ALL_ORIGINS = False
    cors_env = env("CORS_ALLOWED_ORIGINS", "https://globalchat-presintation.render.com")
    cors_origins = cors_env.split(",")
    CORS_ALLOWED_ORIGINS = [u.strip() for u in cors_origins if u.strip()]


# ==================================================
# URLS / TEMPLATES
# ==================================================

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ==================================================
# ASGI / CHANNELS
# ==================================================

ASGI_APPLICATION = "core.asgi.application"

# Configure CHANNEL_LAYERS from REDIS_URL if provided (recommended for prod).
REDIS_URL = env("REDIS_URL")
if REDIS_URL:
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels_redis.core.RedisChannelLayer",
            "CONFIG": {"hosts": [REDIS_URL]},
        }
    }
else:
    CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}


# ==================================================
# DATABASE
# Use DATABASE_URL in production (Render provides it). Fallback to sqlite for dev.
# ==================================================

DATABASE_URL = env("DATABASE_URL")
if DATABASE_URL:
    try:
        import dj_database_url

        DATABASES = {"default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)}
    except Exception:
        # If dj_database_url is not installed, fallback to sqlite and warn in logs.
        DATABASES = {
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": BASE_DIR / "db.sqlite3",
            }
        }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# ==================================================
# STATIC / MEDIA
# ==================================================

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Use WhiteNoise to serve static files on Render; enable compressed manifest storage in production
if not DEBUG:
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# ==================================================
# DJANGO DEFAULTS
# ==================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ==================================================
# DRF / JWT
# ==================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}


# ==================================================
# SWAGGER / OPENAPI
# ==================================================

SPECTACULAR_SETTINGS = {
    "TITLE": "GlobalChat API",
    "DESCRIPTION": "Backend API for chat application",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": True,
}


# ==================================================
# PRODUCTION SECURITY TWEAKS
# ==================================================
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(env("SECURE_HSTS_SECONDS", "3600"))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
