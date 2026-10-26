# ─── Build-time notes ─────────────────────────────────────────────────────────
# This image runs the Laravel API. Required environment variables at runtime
# (pass them with `docker run -e ...` or an env_file):
#
#   APP_KEY=base64:...        # REQUIRED in prod. Generate with: php artisan key:generate --show
#   APP_ENV=production        # or "local" for development
#   APP_DEBUG=false           # true only in local development
#   APP_URL=https://api.example.com
#   APP_PORT=8000             # in-app listen port (default 8000; CMD also accepts PORT)
#   DB_CONNECTION=pgsql       # or mysql / sqlite (pgsql and mysql drivers are installed)
#   DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
#   CORS_ALLOWED_ORIGINS="https://app.example.com"   # comma-separated frontend origins
#   LOG_CHANNEL=stack
#   CACHE_DRIVER, SESSION_DRIVER, QUEUE_CONNECTION   # file-based drivers by default
#
# Optional integrations (uncomment keys inside backend/.env at runtime):
#   MAIL_MAILER/MAIL_HOST/MAIL_PORT/...   REDIS_HOST/REDIS_PORT/REDIS_PASSWORD
#   PUSHER_*   PAYPAL_* (PayPal REST API credentials used by PaymentController)
#   GOOGLE/Facebook social login credentials consumed via Socialite
#   FRONTEND_URL (used for cross-app redirects)
#
# The image builds exclusively from backend/composer.json + backend/composer.lock.
# NOTE: composer.lock must be regenerated (`composer update`) after adding
# laravel/socialite and paypal/rest-api-sdk-php so `composer install` picks
# them up inside the image.
# ─────────────────────────────────────────────────────────────────────────────

FROM php:8.1-cli

# PHP extensions needed by the app (PostgreSQL + MySQL PDO drivers, mbstring, exif).
# libonig-dev is required to build mbstring, libpq-dev for pdo_pgsql.
RUN apt-get update && apt-get install -y --no-install-recommends \
        libonig-dev \
        libpq-dev \
        unzip \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_pgsql pdo_mysql mbstring exif

# Composer: copy the official composer binary from its image.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Cacheable dependency layer: copy only manifest files first.
COPY composer.json composer.lock ./

# Install production dependencies (no dev packages; no scripts that need the
# framework, artisan does not exist yet at this stage).
RUN composer install \
        --no-dev \
        --no-scripts \
        --no-autoloader \
        --no-interaction \
        --prefer-dist

# Now copy the application and finish autoloading.
# NOTE: config:cache deliberately does NOT run at build time — configuration
# must be cached at container start so runtime env vars (APP_KEY, DB_*, CORS_*)
# are honored. The CMD below caches on boot.
COPY . .

RUN composer dump-autoload --optimize

EXPOSE 8000

# Serve through artisan (fine for a single-container host; put a reverse proxy
# in front for TLS in production).
CMD ["sh", "-c", "[ -f .env ] || cp .env.example .env; php artisan config:cache || true; exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
