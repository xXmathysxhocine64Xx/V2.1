#!/bin/bash

# WebCraft - Installation Script pour Ubuntu 24.04
# Ce script installe automatiquement WebCraft sur votre VPS

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Variables
PROJECT_NAME="webcraft"
DOMAIN=""
EMAIL=""
INSTALL_DIR="/var/www/$PROJECT_NAME"
USER="www-data"

# Fonction pour vérifier si le script est exécuté en tant que root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "Ce script doit être exécuté en tant que root"
        exit 1
    fi
}

# Fonction pour demander les informations à l'utilisateur
get_user_input() {
    echo -e "${BLUE}=== Configuration WebCraft ===${NC}"
    
    read -p "Nom de domaine (ex: webcraft.votredomaine.com): " DOMAIN
    if [[ -z "$DOMAIN" ]]; then
        print_error "Le nom de domaine est requis"
        exit 1
    fi
    
    read -p "Email pour SSL (Let's Encrypt): " EMAIL
    if [[ -z "$EMAIL" ]]; then
        print_error "L'email est requis pour SSL"
        exit 1
    fi
    
    echo -e "${GREEN}Configuration:${NC}"
    echo "  Domaine: $DOMAIN"
    echo "  Email: $EMAIL"
    echo "  Répertoire: $INSTALL_DIR"
    echo ""
    
    read -p "Continuer avec cette configuration? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Installation annulée"
        exit 1
    fi
}

# Mise à jour du système
update_system() {
    print_status "Mise à jour du système..."
    apt update && apt upgrade -y
    print_success "Système mis à jour"
}

# Installation des dépendances système
install_dependencies() {
    print_status "Installation des dépendances système..."
    apt install -y \
        curl \
        wget \
        git \
        nginx \
        certbot \
        python3-certbot-nginx \
        python3 \
        python3-pip \
        python3-venv \
        nodejs \
        npm \
        pm2 \
        ufw \
        htop \
        unzip
    
    # Installation de yarn
    npm install -g yarn
    
    print_success "Dépendances système installées"
}

# Configuration du firewall
configure_firewall() {
    print_status "Configuration du firewall..."
    ufw --force enable
    ufw allow ssh
    ufw allow 'Nginx Full'
    ufw allow 22
    ufw allow 80
    ufw allow 443
    print_success "Firewall configuré"
}

# Création du répertoire de travail
create_directories() {
    print_status "Création des répertoires..."
    mkdir -p $INSTALL_DIR
    mkdir -p $INSTALL_DIR/backend
    mkdir -p $INSTALL_DIR/frontend
    mkdir -p /var/log/webcraft
    chown -R $USER:$USER $INSTALL_DIR
    chown -R $USER:$USER /var/log/webcraft
    print_success "Répertoires créés"
}

# Installation des fichiers de l'application
install_application() {
    print_status "Installation de l'application..."
    
    # Copie des fichiers backend
    cp -r /app/backend/* $INSTALL_DIR/backend/
    
    # Copie des fichiers frontend
    cp -r /app/frontend/* $INSTALL_DIR/frontend/
    
    # Configuration des variables d'environnement
    cat > $INSTALL_DIR/backend/.env << EOF
DATABASE_URL=sqlite:///$INSTALL_DIR/backend/webcraft.db
EOF
    
    cat > $INSTALL_DIR/frontend/.env << EOF
REACT_APP_BACKEND_URL=https://$DOMAIN
EOF
    
    chown -R $USER:$USER $INSTALL_DIR
    print_success "Application installée"
}

# Installation des dépendances Python
install_python_deps() {
    print_status "Installation des dépendances Python..."
    cd $INSTALL_DIR/backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    chown -R $USER:$USER $INSTALL_DIR/backend/venv
    print_success "Dépendances Python installées"
}

# Build du frontend
build_frontend() {
    print_status "Build du frontend..."
    cd $INSTALL_DIR/frontend
    sudo -u $USER yarn install
    sudo -u $USER yarn build
    print_success "Frontend buildé"
}

# Configuration PM2
configure_pm2() {
    print_status "Configuration PM2..."
    
    cat > $INSTALL_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'webcraft-backend',
    script: '$INSTALL_DIR/backend/venv/bin/python',
    args: '-m uvicorn server:app --host 0.0.0.0 --port 8001',
    cwd: '$INSTALL_DIR/backend',
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    exec_mode: 'fork',
    log_file: '/var/log/webcraft/backend.log',
    error_file: '/var/log/webcraft/backend_error.log',
    out_file: '/var/log/webcraft/backend_out.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};
EOF
    
    # Démarrage avec PM2
    sudo -u $USER pm2 start $INSTALL_DIR/ecosystem.config.js
    sudo -u $USER pm2 save
    pm2 startup
    
    print_success "PM2 configuré"
}

# Configuration Nginx
configure_nginx() {
    print_status "Configuration Nginx..."
    
    cat > /etc/nginx/sites-available/$PROJECT_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    # Redirection vers HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;
    
    # SSL sera configuré par Certbot
    
    # Frontend (React build)
    location / {
        root $INSTALL_DIR/frontend/build;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
        
        # Headers pour les ressources statiques
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Logs
    access_log /var/log/nginx/${PROJECT_NAME}_access.log;
    error_log /var/log/nginx/${PROJECT_NAME}_error.log;
}
EOF
    
    # Activation du site
    ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Test de la configuration
    nginx -t
    systemctl reload nginx
    
    print_success "Nginx configuré"
}

# Configuration SSL avec Let's Encrypt
configure_ssl() {
    print_status "Configuration SSL..."
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL
    
    # Renouvellement automatique
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    print_success "SSL configuré"
}

# Initialisation de la base de données
init_database() {
    print_status "Initialisation de la base de données..."
    cd $INSTALL_DIR/backend
    source venv/bin/activate
    python3 -c "
from server import Base, engine
Base.metadata.create_all(bind=engine)
print('Base de données initialisée')
"
    chown $USER:$USER $INSTALL_DIR/backend/webcraft.db
    print_success "Base de données initialisée"
}

# Création des scripts de maintenance
create_maintenance_scripts() {
    print_status "Création des scripts de maintenance..."
    
    # Script de backup
    cat > /usr/local/bin/webcraft-backup << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/webcraft"
mkdir -p $BACKUP_DIR

# Backup de la base de données
cp /var/www/webcraft/backend/webcraft.db $BACKUP_DIR/webcraft_$DATE.db

# Backup des fichiers de configuration
tar -czf $BACKUP_DIR/webcraft_config_$DATE.tar.gz \
    /var/www/webcraft/backend/.env \
    /var/www/webcraft/frontend/.env \
    /etc/nginx/sites-available/webcraft

# Nettoyage des anciens backups (garde 7 jours)
find $BACKUP_DIR -name "webcraft_*" -mtime +7 -delete

echo "Backup créé: $BACKUP_DIR/webcraft_$DATE.db"
EOF
    
    # Script de mise à jour
    cat > /usr/local/bin/webcraft-update << 'EOF'
#!/bin/bash
cd /var/www/webcraft

# Backup avant mise à jour
/usr/local/bin/webcraft-backup

# Mise à jour du backend
cd backend
source venv/bin/activate
pip install --upgrade -r requirements.txt

# Redémarrage des services
pm2 restart webcraft-backend
systemctl reload nginx

echo "Mise à jour terminée"
EOF
    
    # Script de status
    cat > /usr/local/bin/webcraft-status << 'EOF'
#!/bin/bash
echo "=== WebCraft Status ==="
echo "Backend (PM2):"
pm2 status webcraft-backend
echo ""
echo "Nginx:"
systemctl status nginx --no-pager -l
echo ""
echo "SSL Certificate:"
certbot certificates
echo ""
echo "Database:"
ls -la /var/www/webcraft/backend/webcraft.db
EOF
    
    chmod +x /usr/local/bin/webcraft-*
    
    print_success "Scripts de maintenance créés"
}

# Configuration des logs
configure_logs() {
    print_status "Configuration des logs..."
    
    # Logrotate pour les logs de l'application
    cat > /etc/logrotate.d/webcraft << EOF
/var/log/webcraft/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload webcraft-backend
    endscript
}
EOF
    
    print_success "Logs configurés"
}

# Fonction principale
main() {
    print_status "Début de l'installation WebCraft..."
    
    check_root
    get_user_input
    update_system
    install_dependencies
    configure_firewall
    create_directories
    install_application
    install_python_deps
    build_frontend
    configure_pm2
    configure_nginx
    configure_ssl
    init_database
    create_maintenance_scripts
    configure_logs
    
    print_success "Installation terminée avec succès!"
    echo ""
    echo -e "${GREEN}=== Information de déploiement ===${NC}"
    echo "Site web: https://$DOMAIN"
    echo "Répertoire: $INSTALL_DIR"
    echo "Logs: /var/log/webcraft/"
    echo ""
    echo -e "${YELLOW}=== Commandes utiles ===${NC}"
    echo "Status: webcraft-status"
    echo "Backup: webcraft-backup"
    echo "Update: webcraft-update"
    echo "PM2: pm2 status"
    echo "Nginx: systemctl status nginx"
    echo ""
    echo -e "${BLUE}Installation terminée! Votre site est maintenant disponible sur https://$DOMAIN${NC}"
}

# Exécution du script principal
main "$@"