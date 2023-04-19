FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y git unzip

RUN apt-get install -y libzip-dev libpq-dev libxml2-dev
# Install PHP extensions
RUN docker-php-ext-install pdo_mysql gettext bcmath  zip xml opcache && \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp &&\
    docker-php-ext-install gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www