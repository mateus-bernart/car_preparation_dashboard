#!/bin/bash
set -e

echo "🚀 RAILWAY BUILD - WORKAROUND PARA SEEDERS"
echo "=========================================="

# Limpeza e dependências
rm -rf public/build public/hot
composer install --no-dev --optimize-autoloader

# Migrations sempre funcionam
echo "🗄️ Executando migrations..."
php artisan migrate --force

# WORKAROUND: Executar seeders via código PHP ao invés de artisan
echo "🌱 Executando seeders via workaround..."
if [ "$RUN_SEEDERS" = "true" ]; then
    php -r "
    require 'vendor/autoload.php';
    \$app = require_once 'bootstrap/app.php';
    \$kernel = \$app->make(Illuminate\Contracts\Console\Kernel::class);
    \$kernel->bootstrap();
    
    echo '🏃 Executando seeders manualmente...' . PHP_EOL;
    
    try {
        // UserSeeder
        echo '👤 Criando usuário...' . PHP_EOL;
        if (!App\Models\User::where('email', 'test@test.com')->exists()) {
            App\Models\User::create([
                'name' => 'Test User',
                'email' => 'test@test.com',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]);
            echo '✅ Usuário criado!' . PHP_EOL;
        } else {
            echo '⚠️  Usuário já existe' . PHP_EOL;
        }
        
        // CategorySeeder
        echo '📂 Criando categorias...' . PHP_EOL;
        \$categories = ['Mecânica', 'Eletrônica', 'Limpeza', 'Pintura'];
        foreach (\$categories as \$cat) {
            if (!App\Models\Category::where('description', \$cat)->exists()) {
                App\Models\Category::create([
                    'description' => \$cat,
                    'status' => 1,
                ]);
                echo '✅ Categoria ' . \$cat . ' criada!' . PHP_EOL;
            }
        }
        
        echo '🎉 Todos os seeders executados com sucesso!' . PHP_EOL;
        echo '👥 Total usuários: ' . App\Models\User::count() . PHP_EOL;
        echo '📂 Total categorias: ' . App\Models\Category::count() . PHP_EOL;
        
    } catch (Exception \$e) {
        echo '❌ Erro: ' . \$e->getMessage() . PHP_EOL;
        exit(1);
    }
    "
else
    echo "⏭️  Seeders pulados (RUN_SEEDERS != true)"
fi

# Storage e otimizações
php artisan storage:link || echo "Link já existe"
php artisan optimize

# Frontend
npm ci && npm run build

echo "✅ Deploy finalizado!"