#!/bin/bash
set -e

echo "==================================="
echo "🚀 INICIANDO DEPLOY - RAILWAY BUILD"
echo "==================================="

echo "🔧 Limpando build anterior..."
rm -rf public/build
rm -f public/hot

echo "📦 Instalando dependências do PHP..."
composer install --no-dev --optimize-autoloader

echo "🔍 DEBUG: Verificando variável RUN_SEEDERS..."
echo "RUN_SEEDERS = '${RUN_SEEDERS}'"

echo "🔍 Verificando se é o primeiro deploy..."
# Verifica se a tabela de migrations existe
if php artisan migrate:status > /dev/null 2>&1; then
    echo "📊 BANCO JÁ EXISTE - Deploy incremental"
    
    echo "🔄 Executando apenas migrations pendentes..."
    php artisan migrate --force
    
    # Seeders apenas se explicitamente solicitado
    echo "🔍 Checando se deve executar seeders..."
    if [ "$RUN_SEEDERS" = "true" ]; then
        echo "🌱 EXECUTANDO SEEDERS (RUN_SEEDERS=true)..."
        php artisan db:seed --force --verbose
        echo "✅ SEEDERS EXECUTADOS!"
        echo "⚠️  LEMBRE-SE: Mude RUN_SEEDERS para false após este deploy!"
        
        # Verificar se realmente criou dados
        echo "📊 Verificando dados criados..."
        php artisan tinker --execute="echo 'Total usuários: ' . App\\Models\\User::count();"
    else
        echo "❌ SEEDERS NÃO EXECUTADOS"
        echo "   RUN_SEEDERS = '${RUN_SEEDERS}' (não é 'true')"
        echo "   Para executar seeders, defina RUN_SEEDERS=true"
    fi
    
else
    echo "🆕 PRIMEIRO DEPLOY DETECTADO - Configuração inicial"
    
    echo "🗄️ Criando estrutura do banco..."
    php artisan migrate --force
    
    echo "🌱 Executando seeders iniciais..."
    php artisan db:seed --force --verbose
    
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

echo "📈 Status final das migrations:"
php artisan migrate:status || echo "Erro ao verificar status das migrations"

echo "==================================="
echo "✅ DEPLOY FINALIZADO COM SUCESSO!"
echo "==================================="