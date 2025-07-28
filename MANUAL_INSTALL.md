# 🔧 Installation Manuelle WebCraft - Ligne par Ligne

## 📋 Vue d'ensemble
Installation manuelle complète de WebCraft sur VPS Ubuntu 24.04, étape par étape avec chaque commande expliquée.

**Variables à remplacer :**
- `VOTRE_IP` : IP de votre VPS (ex: 123.456.789.012)
- `VOTRE_DOMAINE` : votre domaine (ex: webcraft.votredomaine.com)  
- `VOTRE_EMAIL` : votre email pour SSL (ex: vous@email.com)

---

## 🖥️ PARTIE 1 : Préparation sur votre machine locale

### 1.1 Créer le package manuellement
```bash
# Aller dans votre projet
cd /path/to/your/webcraft

# Créer dossier de déploiement
mkdir -p deploy_package

# Copier le backend (sans cache)
cp -r backend deploy_package/
rm -rf deploy_package/backend/__pycache__
rm -f deploy_package/backend/webcraft.db

# Copier le frontend (sans node_modules)
cp -r frontend deploy_package/
rm -rf deploy_package/frontend/node_modules
rm -rf deploy_package/frontend/build

# Copier les scripts
cp deploy/install.sh deploy_package/
cp deploy/webcraft-service.sh deploy_package/
chmod +x deploy_package/install.sh
chmod +x deploy_package/webcraft-service.sh

# Créer l'archive
tar -czf webcraft_$(date +%Y%m%d_%H%M%S).tar.gz deploy_package

# Nettoyer
rm -rf deploy_package

echo "Package créé : webcraft_*.tar.gz"
```

### 1.2 Transférer sur le VPS
```bash
# Transférer le package
scp webcraft_*.tar.gz root@VOTRE_IP:/tmp/

# Se connecter au VPS
ssh root@VOTRE_IP
```

---

## 🛠️ PARTIE 2 : Installation sur le VPS

### 2.1 Mise à jour système
```bash
# Mise à jour des paquets
apt update
apt upgrade -y

# Vérifier la version Ubuntu
lsb_release -a
```

### 2.2 Installation des dépendances système
```bash
# Outils de base
apt install -y curl wget git unzip htop nano

# Python 3 et pip
apt install -y python3 python3-pip python3-venv

# Node.js et npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Installer Yarn
npm install -g yarn

# Nginx
apt install -y nginx

# Certbot pour SSL
apt install -y certbot python3-certbot-nginx

# PM2 pour la gestion des processus
npm install -g pm2

# Firewall UFW
apt install -y ufw
```

### 2.3 Configuration du firewall
```bash
# Réinitialiser UFW
ufw --force reset

# Politiques par défaut
ufw default deny incoming
ufw default allow outgoing

# Autoriser SSH, HTTP, HTTPS
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# Activer le firewall
ufw --force enable

# Vérifier le statut
ufw status verbose
```

### 2.4 Création des répertoires
```bash
# Répertoire principal de l'application
mkdir -p /var/www/webcraft

# Répertoires pour les logs
mkdir -p /var/log/webcraft

# Répertoires pour les backups
mkdir -p /var/backups/webcraft

# Changer le propriétaire
chown -R www-data:www-data /var/www/webcraft
chown -R www-data:www-data /var/log/webcraft
```

### 2.5 Extraction et installation de l'application
```bash
# Aller dans le dossier temporaire
cd /tmp

# Extraire le package
tar -xzf webcraft_*.tar.gz

# Copier les fichiers backend
cp -r deploy_package/backend/* /var/www/webcraft/backend/

# Copier les fichiers frontend
cp -r deploy_package/frontend/* /var/www/webcraft/frontend/

# Copier les scripts
cp deploy_package/webcraft-service.sh /var/www/webcraft/

# Ajuster les permissions
chown -R www-data:www-data /var/www/webcraft
```

---

## 🔧 PARTIE 3 : Configuration Backend Python

### 3.1 Environnement virtuel Python
```bash
# Aller dans le dossier backend
cd /var/www/webcraft/backend

# Créer l'environnement virtuel
python3 -m venv venv

# Activer l'environnement
source venv/bin/activate

# Installer les dépendances
pip install --upgrade pip
pip install -r requirements.txt

# Désactiver l'environnement
deactivate

# Ajuster les permissions
chown -R www-data:www-data venv
```

### 3.2 Configuration de la base de données
```bash
# Créer le fichier .env pour le backend
cat > /var/www/webcraft/backend/.env << EOF
DATABASE_URL=sqlite:///./webcraft.db
EOF

# Initialiser la base de données
cd /var/www/webcraft/backend
source venv/bin/activate
python3 -c "
from server import Base, engine
Base.metadata.create_all(bind=engine)
print('Base de données initialisée')
"
deactivate

# Ajuster les permissions
chown www-data:www-data /var/www/webcraft/backend/.env
chown www-data:www-data /var/www/webcraft/backend/webcraft.db
```

---

## ⚛️ PARTIE 4 : Configuration Frontend React

### 4.1 Installation des dépendances Node.js
```bash
# Aller dans le dossier frontend
cd /var/www/webcraft/frontend

# Installer les dépendances avec Yarn
sudo -u www-data yarn install
```

### 4.2 Configuration de l'environnement frontend
```bash
# Créer le fichier .env pour le frontend
cat > /var/www/webcraft/frontend/.env << EOF
REACT_APP_BACKEND_URL=https://VOTRE_DOMAINE
EOF

# Remplacer VOTRE_DOMAINE par votre vrai domaine
sed -i 's/VOTRE_DOMAINE/webcraft.votredomaine.com/g' /var/www/webcraft/frontend/.env

# Ajuster les permissions
chown www-data:www-data /var/www/webcraft/frontend/.env
```

### 4.3 Build du frontend
```bash
# Toujours dans /var/www/webcraft/frontend
sudo -u www-data yarn build

# Vérifier que le build s'est bien créé
ls -la build/
```

---

## 🚀 PARTIE 5 : Configuration PM2 pour le Backend

### 5.1 Créer la configuration PM2
```bash
# Créer le fichier de configuration PM2
cat > /var/www/webcraft/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'webcraft-backend',
    script: '/var/www/webcraft/backend/venv/bin/python',
    args: '-m uvicorn server:app --host 0.0.0.0 --port 8001',
    cwd: '/var/www/webcraft/backend',
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

# Ajuster les permissions
chown www-data:www-data /var/www/webcraft/ecosystem.config.js
```

### 5.2 Démarrer le backend avec PM2
```bash
# Démarrer l'application
sudo -u www-data pm2 start /var/www/webcraft/ecosystem.config.js

# Sauvegarder la configuration PM2
sudo -u www-data pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Suivre les instructions affichées par PM2

# Vérifier que ça fonctionne
pm2 status
pm2 logs webcraft-backend --lines 10
```

### 5.3 Test du backend
```bash
# Tester que le backend répond
curl http://localhost:8001/api/

# Vérifier que le port est ouvert
netstat -tlnp | grep :8001
```

---

## 🌐 PARTIE 6 : Configuration Nginx

### 6.1 Créer la configuration Nginx
```bash
# Créer le fichier de configuration Nginx
cat > /etc/nginx/sites-available/webcraft << EOF
server {
    listen 80;
    server_name VOTRE_DOMAINE;
    
    # Redirection vers HTTPS (sera activée après SSL)
    # return 301 https://\$server_name\$request_uri;
    
    # Configuration temporaire pour obtenir SSL
    location / {
        root /var/www/webcraft/frontend/build;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
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
}
EOF

# Remplacer VOTRE_DOMAINE par votre vrai domaine
sed -i 's/VOTRE_DOMAINE/webcraft.votredomaine.com/g' /etc/nginx/sites-available/webcraft
```

### 6.2 Activer le site
```bash
# Créer le lien symbolique
ln -sf /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/

# Désactiver le site par défaut
rm -f /etc/nginx/sites-enabled/default

# Tester la configuration
nginx -t

# Recharger Nginx
systemctl reload nginx

# Vérifier le statut
systemctl status nginx
```

### 6.3 Test initial du site
```bash
# Tester l'accès HTTP
curl -I http://VOTRE_DOMAINE/

# Ou avec localhost si DNS pas encore configuré
curl -I http://localhost/
```

---

## 🔒 PARTIE 7 : Configuration SSL avec Let's Encrypt

### 7.1 Obtenir le certificat SSL
```bash
# Obtenir le certificat SSL (assurez-vous que le DNS pointe vers votre VPS)
certbot --nginx -d VOTRE_DOMAINE --non-interactive --agree-tos --email VOTRE_EMAIL

# Remplacer par vos vraies valeurs
# Exemple : certbot --nginx -d webcraft.votredomaine.com --non-interactive --agree-tos --email vous@email.com
```

### 7.2 Configuration automatique du renouvellement
```bash
# Ajouter une tâche cron pour le renouvellement automatique
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Tester le renouvellement
certbot renew --dry-run

# Vérifier les certificats
certbot certificates
```

### 7.3 Test du site HTTPS
```bash
# Tester l'accès HTTPS
curl -I https://VOTRE_DOMAINE/

# Tester l'API
curl https://VOTRE_DOMAINE/api/
```

---

## 📋 PARTIE 8 : Scripts de Maintenance

### 8.1 Script de backup
```bash
# Créer le script de backup
cat > /usr/local/bin/webcraft-backup << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/webcraft"

# Backup de la base de données
cp /var/www/webcraft/backend/webcraft.db $BACKUP_DIR/webcraft_$DATE.db

# Backup des configurations
tar -czf $BACKUP_DIR/webcraft_config_$DATE.tar.gz \
    /var/www/webcraft/backend/.env \
    /var/www/webcraft/frontend/.env \
    /etc/nginx/sites-available/webcraft

# Nettoyage des anciens backups (garde 7 jours)
find $BACKUP_DIR -name "webcraft_*" -mtime +7 -delete

echo "Backup créé: $BACKUP_DIR/webcraft_$DATE.db"
EOF

# Rendre exécutable
chmod +x /usr/local/bin/webcraft-backup
```

### 8.2 Script de status
```bash
# Créer le script de status
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
echo ""
echo "Disk Usage:"
df -h /var/www/webcraft/
EOF

# Rendre exécutable
chmod +x /usr/local/bin/webcraft-status
```

### 8.3 Configuration des logs rotatifs
```bash
# Configuration logrotate
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
```

---

## ✅ PARTIE 9 : Vérifications Finales

### 9.1 Tests de fonctionnement
```bash
# Vérifier tous les services
webcraft-status

# Tester l'API
curl https://VOTRE_DOMAINE/api/

# Vérifier les logs
pm2 logs webcraft-backend --lines 20

# Vérifier les ports
netstat -tlnp | grep -E ':(80|443|8001)'

# Faire un backup test
webcraft-backup
```

### 9.2 Tests de sécurité
```bash
# Vérifier le firewall
ufw status verbose

# Vérifier les permissions
ls -la /var/www/webcraft/backend/webcraft.db
ls -la /var/www/webcraft/backend/.env

# Vérifier SSL
openssl s_client -connect VOTRE_DOMAINE:443 -servername VOTRE_DOMAINE < /dev/null
```

---

## 🎉 INSTALLATION TERMINÉE !

### **Votre site est maintenant accessible sur :**
- 🌐 **Site web** : `https://VOTRE_DOMAINE`
- 🔧 **API** : `https://VOTRE_DOMAINE/api/`

### **Commandes de maintenance quotidiennes :**
```bash
webcraft-status          # Statut général
webcraft-backup          # Backup manuel
pm2 status               # Statut backend
systemctl status nginx   # Statut serveur web
pm2 logs webcraft-backend --lines 20  # Logs récents
```

### **Fichiers importants :**
- **App** : `/var/www/webcraft/`
- **Logs** : `/var/log/webcraft/`  
- **Backups** : `/var/backups/webcraft/`
- **Config Nginx** : `/etc/nginx/sites-available/webcraft`
- **Config PM2** : `/var/www/webcraft/ecosystem.config.js`

**🚀 Votre application WebCraft est maintenant déployée et sécurisée !**