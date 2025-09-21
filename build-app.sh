#!/bin/bash
set -e

echo "🔧 Limpando build anterior..."
rm -rf public/build
rm -f public/hot

echo "📦 Instalando dependências do PHP..."
composer install --no-dev --optimize-autoloader

echo "🔍 Verificando se é o primeiro deploy..."
# Verifica se a tabela de migrations existe
if php artisan migrate:status > /dev/null 2>&1; then
    echo "📊 Banco já existe - Deploy incremental"
    
    echo "🔄 Executando apenas migrations pendentes..."
    php artisan migrate --force
    
    # Seeders apenas se explicitamente solicitado
    if [ "$RUN_SEEDERS" = "true" ]; then
        echo "🌱 Executando seeders (RUN_SEEDERS=true)..."
        php artisan db:seed --force
        echo "⚠️  LEMBRE-SE: Mude RUN_SEEDERS para false após este deploy!"
    else
        echo "ℹ️  Seeders não executados (para rodar: defina RUN_SEEDERS=true)"
    fi
    
else
    echo "🆕 Primeiro deploy detectado - Configuração inicial"
    
    echo "🗄️ Criando estrutura do banco..."
    php artisan migrate --force
    
    echo "🌱 Executando seeders iniciais..."
    php artisan db:seed --force
    
    echo "✅ Configuração inicial concluída!"
fi

echo "🧹 Limpando caches..."
php artisan optimize:clear

echo "⚙️ Otimizando para produção..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "📦 Instalando dependências do Node..."
npm ci

echo "🛠 Construindo front-end..."
npm run build

echo "✅ Deploy finalizado!"

# Log de status final
echo "📈 Status final:"
php artisan migrate:status || echo "Erro ao verificar status das migrations"