#!/bin/bash
# WebCraft - Installation Ultra-Simple pour Ubuntu 24.04
# Une seule commande pour tout installer !

set -e

echo "🚀 WebCraft - Installation Ultra-Simple"
echo "========================================"

# Variables
DOMAIN=""
EMAIL=""
PROJECT_DIR="/var/www/webcraft"

# Demander le domaine et l'email
read -p "🌐 Votre domaine (ex: monsite.com): " DOMAIN
read -p "📧 Votre email pour SSL: " EMAIL

if [[ -z "$DOMAIN" || -z "$EMAIL" ]]; then
    echo "❌ Domaine et email requis!"
    exit 1
fi

echo "✅ Configuration: $DOMAIN avec SSL pour $EMAIL"
echo ""

# 1. Mise à jour système et installation
echo "📦 Installation des outils..."
apt update -qq && apt install -y nginx certbot python3-certbot-nginx python3 python3-pip nodejs npm curl > /dev/null 2>&1
npm install -g pm2 yarn > /dev/null 2>&1

# 2. Création des dossiers
echo "📁 Création des dossiers..."
mkdir -p $PROJECT_DIR/{backend,frontend}
cd /tmp

# 3. Installation du backend
echo "🐍 Configuration du backend Python..."
cp -r /app/backend/* $PROJECT_DIR/backend/
cd $PROJECT_DIR/backend
pip3 install -r requirements.txt > /dev/null 2>&1

# 4. Installation du frontend  
echo "⚛️  Configuration du frontend React..."
cp -r /app/frontend/* $PROJECT_DIR/frontend/
cd $PROJECT_DIR/frontend
echo "REACT_APP_BACKEND_URL=https://$DOMAIN" > .env
yarn install > /dev/null 2>&1
yarn build > /dev/null 2>&1

# 5. Configuration Nginx
echo "🌐 Configuration Nginx..."
cat > /etc/nginx/sites-available/webcraft << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    # Frontend
    location / {
        root $PROJECT_DIR/frontend/build;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Backend API
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

# 6. Démarrage du backend avec PM2
echo "🔧 Démarrage du backend..."
cd $PROJECT_DIR/backend
pm2 start "python3 server.py" --name webcraft-backend
pm2 save
pm2 startup > /dev/null 2>&1

# 7. Configuration SSL
echo "🔒 Configuration SSL..."
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL > /dev/null 2>&1

# 8. Configuration du firewall
echo "🛡️  Configuration du firewall..."
ufw --force enable > /dev/null 2>&1
ufw allow ssh > /dev/null 2>&1
ufw allow 'Nginx Full' > /dev/null 2>&1

# 9. Permissions
chown -R www-data:www-data $PROJECT_DIR

echo ""
echo "🎉 INSTALLATION TERMINÉE !"
echo "=========================="
echo "✅ Site web: https://$DOMAIN"
echo "✅ API: https://$DOMAIN/api/"
echo ""
echo "🛠️  Commandes utiles:"
echo "  pm2 status              # Voir le backend"
echo "  pm2 logs webcraft-backend  # Voir les logs"  
echo "  systemctl status nginx  # Voir nginx"
echo ""
echo "🚀 Votre site WebCraft est prêt !"