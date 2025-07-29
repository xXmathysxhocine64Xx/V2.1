#!/bin/bash
# WebCraft - Script d'Installation Simplifié pour Ubuntu 24.04
# Gère automatiquement l'environnement virtuel Python

set -e  # Arrêter le script en cas d'erreur

echo "🚀 Installation WebCraft - Ubuntu 24.04 Compatible"
echo "=================================================="

# Fonction pour vérifier les erreurs
check_error() {
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de: $1"
        exit 1
    fi
}

# Vérification Ubuntu 24.04
if ! grep -q "24.04" /etc/os-release; then
    echo "⚠️  Ce script est optimisé pour Ubuntu 24.04"
    read -p "Continuer quand même ? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Variables
INSTALL_DIR="/var/www/webcraft"
DOMAIN=""

echo "📋 Configuration"
read -p "🌐 Votre domaine (ex: monsite.com): " DOMAIN

if [[ -z "$DOMAIN" ]]; then
    echo "❌ Domaine requis!"
    exit 1
fi

echo "✅ Configuration: $DOMAIN"
echo ""

# 1. Mise à jour système
echo "📦 1/4 - Mise à jour du système..."
apt update -qq && apt upgrade -y -qq
check_error "mise à jour système"

# 2. Installation des dépendances
echo "🔧 2/4 - Installation des outils..."
echo "  🔹 Installation Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
check_error "ajout repository Node.js"

echo "  🔹 Installation des packages système..."
apt install -y nodejs python3 python3-pip python3-venv nginx certbot python3-certbot-nginx git
check_error "installation packages système"

echo "  🔹 Installation PM2..."
npm install -g pm2
check_error "installation PM2"

echo "  🔹 Vérification des versions..."
echo "    Node.js: $(node --version)"
echo "    Python3: $(python3 --version)"
echo "    PM2: $(pm2 --version)"

# 3. Installation WebCraft
echo "⚙️  3/4 - Installation WebCraft..."
mkdir -p $INSTALL_DIR
cp -r /app/* $INSTALL_DIR/

# Backend avec environnement virtuel
cd $INSTALL_DIR/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

# Frontend
cd $INSTALL_DIR/frontend
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1

# 4. Configuration des services
echo "🌐 4/4 - Configuration des services..."

# PM2 Backend
cd $INSTALL_DIR/backend
source venv/bin/activate
pm2 start "python server.py" --name "webcraft-backend" --interpreter ./venv/bin/python > /dev/null 2>&1
pm2 startup > /dev/null 2>&1
pm2 save > /dev/null 2>&1

# Nginx
cat > /etc/nginx/sites-available/webcraft << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        root $INSTALL_DIR/frontend/build;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# SSL
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN > /dev/null 2>&1

# Permissions
chown -R www-data:www-data $INSTALL_DIR

echo ""
echo "🎉 INSTALLATION TERMINÉE !"
echo "=========================="
echo "✅ Site web: https://$DOMAIN"
echo "✅ API: https://$DOMAIN/api/"
echo ""
echo "🔧 Commandes utiles:"
echo "  pm2 status              # Voir le backend"
echo "  pm2 logs webcraft-backend  # Logs"
echo "  systemctl status nginx  # Voir nginx"
echo ""
echo "🚀 WebCraft est prêt avec Ubuntu 24.04 !"