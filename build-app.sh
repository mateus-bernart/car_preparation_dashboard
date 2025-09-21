#!/bin/bash
set -e

echo "🔧 Limpando build anterior..."
rm -rf public/build
rm -f public/hot

echo "📦 Instalando dependências do PHP..."
composer install --no-dev --optimize-autoloader

echo "🔍 Verificando status do banco..."
php artisan migrate:status || echo "⚠️  Tabela migrations não existe ainda"

echo "🔁 Forçando recriação das tabelas e executando seeders..."
php artisan migrate:fresh --seed --force

echo "✅ Verificando se seeders rodaram..."
php artisan tinker --execute="echo 'Usuários: ' . App\\Models\\User::count();"

echo "🧹 Limpando caches Laravel..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear

echo "⚙️ Gerando caches Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "📦 Instalando dependências do Node..."
npm ci

echo "🛠 Construindo front-end com Vite..."
npm run build

echo "✅ Build completo."