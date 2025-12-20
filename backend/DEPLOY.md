Render deployment notes

Required environment variables (set in Render Dashboard -> Environment):

- DJANGO_SECRET_KEY: (secure random string)
- DEBUG: False
- ALLOWED_HOSTS: globalchat-presintation.render.com
- DATABASE_URL: postgres://... (Render Postgres)
- REDIS_URL: redis://... (if using Redis for channels)
- CORS_ALLOWED_ORIGINS: https://your-frontend-domain.com (optional)

Start command (Render service settings or Procfile):

web: daphne -b 0.0.0.0 -p $PORT core.asgi:application

Deploy steps (high level):

1. Ensure `requirements.txt` contains: dj-database-url, channels_redis, psycopg2-binary, whitenoise.
2. Set env vars in Render.
3. Push code to repository branch connected to Render.
4. On first deploy, run migrations in a build or via one-off command:

   python manage.py migrate --noinput
   python manage.py collectstatic --noinput

5. Verify logs on Render and test API endpoints.

Local testing:

- Create a `.env` file with:

  DJANGO_SECRET_KEY=dev-secret
  DEBUG=True

- Then run:

  export DJANGO_SECRET_KEY=dev-secret
  export DEBUG=True
  python manage.py migrate
  python manage.py runserver

Notes:
- Frontend `API_BASE` should point to `https://globalchat-presintation.render.com/api`.
- For websockets, use Daphne on Render and configure `REDIS_URL` + `channels_redis` for production.
