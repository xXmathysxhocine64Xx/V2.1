#!/bin/bash
# WebCraft V5.0.1 - Script d'Installation Next.js pour Ubuntu 24.04
# Architecture Next.js Full-Stack avec compatibilité Ubuntu 24.04

set -e  # Arrêter le script en cas d'erreur

echo "🚀 Installation WebCraft V5.0.1 - Next.js Full-Stack"
echo "====================================================="

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
echo "  🔹 Installation Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
check_error "ajout repository Node.js"

echo "  🔹 Installation des packages système..."
apt install -y nodejs nginx certbot python3-certbot-nginx git
check_error "installation packages système"

echo "  🔹 Installation Yarn..."
npm install -g yarn
check_error "installation Yarn"

echo "  🔹 Vérification des versions..."
echo "    Node.js: $(node --version)"
echo "    Yarn: $(yarn --version)"

# 3. Installation WebCraft Next.js
echo "⚙️  3/4 - Installation WebCraft Next.js..."
echo "  🔹 Création du répertoire d'installation..."
mkdir -p $INSTALL_DIR
check_error "création répertoire $INSTALL_DIR"

echo "  🔹 Copie des fichiers Next.js..."
cp -r /app/* $INSTALL_DIR/
check_error "copie des fichiers"

echo "  🔹 Installation des dépendances Next.js..."
cd $INSTALL_DIR
yarn install
check_error "installation dépendances Next.js"

echo "  🔹 Build de production Next.js..."
yarn build
check_error "build Next.js"

echo "    ✅ Application Next.js compilée: $INSTALL_DIR/.next"

# 4. Configuration des services
echo "🌐 4/4 - Configuration des services..."

echo "  🔹 Installation PM2 pour Next.js..."
npm install -g pm2
check_error "installation PM2"

echo "  🔹 Démarrage de l'application Next.js..."
cd $INSTALL_DIR

# Arrêter le service s'il existe déjà
pm2 delete webcraft-nextjs 2>/dev/null || true

# Démarrer Next.js avec PM2
pm2 start "yarn start" --name "webcraft-nextjs"
check_error "démarrage PM2 Next.js"

pm2 startup
pm2 save
check_error "configuration PM2 auto-start"

echo "  🔹 Vérification de l'application..."
sleep 3
if ! pm2 status | grep -q "webcraft-nextjs.*online"; then
    echo "❌ Erreur: L'application Next.js n'a pas démarré correctement"
    echo "Logs PM2:"
    pm2 logs webcraft-nextjs --lines 10
    exit 1
fi

echo "    ✅ Application Next.js démarrée sur port 3000"

echo "  🔹 Test de l'application..."
sleep 2
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "    ✅ Application répond correctement"
else
    echo "    ⚠️  Application ne répond pas encore (peut prendre quelques secondes)"
fi

echo "  🔹 Configuration Nginx pour Next.js..."
cat > /etc/nginx/sites-available/webcraft << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
check_error "création configuration Nginx"

ln -sf /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

echo "  🔹 Test configuration Nginx..."
nginx -t
check_error "validation configuration Nginx"

systemctl reload nginx
check_error "rechargement Nginx"

echo "    ✅ Nginx configuré pour $DOMAIN"

echo "  🔹 Configuration SSL avec Let's Encrypt..."
if certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN; then
    echo "    ✅ SSL configuré avec succès"
else
    echo "    ⚠️  SSL non configuré (vérifiez que le domaine pointe vers ce serveur)"
fi

# Permissions
echo "  🔹 Configuration des permissions..."
chown -R www-data:www-data $INSTALL_DIR
check_error "configuration permissions"

echo ""
echo "🎉 INSTALLATION WEBCRAFT V5.0.1 TERMINÉE !"
echo "=========================================="
echo "✅ Site web: https://$DOMAIN (ou http://$DOMAIN si SSL échoué)"
echo "✅ Application Next.js Full-Stack"
echo ""
echo "🔧 Commandes utiles:"
echo "  pm2 status              # Voir l'application"
echo "  pm2 logs webcraft-nextjs  # Logs"
echo "  systemctl status nginx  # Voir nginx"
echo ""
echo "🚀 WebCraft V5.0.1 est prêt avec Next.js !"
echo ""
echo "📊 Vérifications finales:"
echo "  Application status: $(pm2 status | grep webcraft-nextjs | awk '{print $10}')"
echo "  Nginx status: $(systemctl is-active nginx)"
echo "  Installation directory: $INSTALL_DIR"