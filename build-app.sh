#!/bin/bash
set -e

echo "==================================="
echo "🚀 DEPLOY COM DEBUG DE SEEDERS"
echo "==================================="

echo "📦 Instalando dependências..."
composer install --no-dev --optimize-autoloader

echo "🔄 Migrations..."
php artisan migrate --force

echo "🌱 TESTANDO SEEDERS INDIVIDUALMENTE..."

echo "1️⃣ Executando UserSeeder..."
php artisan db:seed --class=UserSeeder --force || echo "❌ UserSeeder falhou"

echo "2️⃣ Executando CategorySeeder..."
php artisan db:seed --class=CategorySeeder --force || echo "❌ CategorySeeder falhou"

echo "3️⃣ Executando CarSeeder..."
php artisan db:seed --class=CarSeeder --force || echo "❌ CarSeeder falhou"

echo "4️⃣ Executando PrioritySeed..."
php artisan db:seed --class=PrioritySeed --force || echo "❌ PrioritySeed falhou"

echo "5️⃣ Executando DefaultTasksSeeder..."
php artisan db:seed --class=DefaultTasksSeeder --force || echo "❌ DefaultTasksSeeder falhou"

echo "📊 Verificando dados criados..."
php artisan tinker --execute="
echo 'Usuários: ' . App\\Models\\User::count() . PHP_EOL;
echo 'Categorias: ' . App\\Models\\Category::count() . PHP_EOL;
try {
    echo 'Carros: ' . App\\Models\\Car::count() . PHP_EOL;
} catch (Exception \$e) {
    echo 'Erro ao contar carros: ' . \$e->getMessage() . PHP_EOL;
}
"

echo "🧹 Otimizando..."
php artisan optimize

echo "📦 Build frontend..."
npm ci && npm run build

echo "✅ Deploy com debug finalizado!"