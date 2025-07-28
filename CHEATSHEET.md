# 📝 AIDE-MÉMOIRE - Installation Manuelle WebCraft

## 🚀 Commandes Essentielles (Copy-Paste Ready)

### Création du package (sur votre machine)
```bash
cd /path/to/webcraft
mkdir -p deploy_package
cp -r backend deploy_package/ && rm -rf deploy_package/backend/__pycache__ deploy_package/backend/webcraft.db
cp -r frontend deploy_package/ && rm -rf deploy_package/frontend/node_modules deploy_package/frontend/build
cp deploy/install.sh deploy/webcraft-service.sh deploy_package/
chmod +x deploy_package/*.sh
tar -czf webcraft_$(date +%Y%m%d_%H%M%S).tar.gz deploy_package
rm -rf deploy_package
```

### Installation des dépendances (sur VPS)
```bash
apt update && apt upgrade -y
apt install -y curl wget git unzip htop nano python3 python3-pip python3-venv nginx certbot python3-certbot-nginx ufw
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs
npm install -g yarn pm2
```

### Configuration firewall
```bash
ufw --force reset && ufw default deny incoming && ufw default allow outgoing
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable
```

### Création des dossiers
```bash
mkdir -p /var/www/webcraft /var/log/webcraft /var/backups/webcraft
chown -R www-data:www-data /var/www/webcraft /var/log/webcraft
```

### Installation backend Python
```bash
cd /var/www/webcraft/backend
python3 -m venv venv && source venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt && deactivate
chown -R www-data:www-data venv
```

### Configuration base de données
```bash
echo "DATABASE_URL=sqlite:///./webcraft.db" > /var/www/webcraft/backend/.env
cd /var/www/webcraft/backend && source venv/bin/activate && python3 -c "from server import Base, engine; Base.metadata.create_all(bind=engine); print('DB OK')" && deactivate
chown www-data:www-data /var/www/webcraft/backend/.env /var/www/webcraft/backend/webcraft.db
```

### Installation frontend React
```bash
cd /var/www/webcraft/frontend && sudo -u www-data yarn install
echo "REACT_APP_BACKEND_URL=https://VOTRE_DOMAINE" > /var/www/webcraft/frontend/.env
sudo -u www-data yarn build && chown www-data:www-data /var/www/webcraft/frontend/.env
```

### Configuration PM2
```bash
cat > /var/www/webcraft/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'webcraft-backend',
    script: '/var/www/webcraft/backend/venv/bin/python',
    args: '-m uvicorn server:app --host 0.0.0.0 --port 8001',
    cwd: '/var/www/webcraft/backend',
    env: { NODE_ENV: 'production' },
    instances: 1,
    exec_mode: 'fork',
    log_file: '/var/log/webcraft/backend.log',
    error_file: '/var/log/webcraft/backend_error.log',
    out_file: '/var/log/webcraft/backend_out.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};
EOF

chown www-data:www-data /var/www/webcraft/ecosystem.config.js
sudo -u www-data pm2 start /var/www/webcraft/ecosystem.config.js
sudo -u www-data pm2 save && pm2 startup
```

### Configuration Nginx
```bash
cat > /etc/nginx/sites-available/webcraft << 'EOF'
server {
    listen 80;
    server_name VOTRE_DOMAINE;
    
    location / {
        root /var/www/webcraft/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### SSL Let's Encrypt
```bash
certbot --nginx -d VOTRE_DOMAINE --non-interactive --agree-tos --email VOTRE_EMAIL
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
```

### Scripts de maintenance
```bash
# Script backup
cat > /usr/local/bin/webcraft-backup << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /var/www/webcraft/backend/webcraft.db /var/backups/webcraft/webcraft_$DATE.db
find /var/backups/webcraft -name "webcraft_*" -mtime +7 -delete
echo "Backup: /var/backups/webcraft/webcraft_$DATE.db"
EOF

# Script status
cat > /usr/local/bin/webcraft-status << 'EOF'
#!/bin/bash
echo "=== WebCraft Status ==="; pm2 status webcraft-backend
echo ""; systemctl status nginx --no-pager -l
echo ""; ls -la /var/www/webcraft/backend/webcraft.db
EOF

chmod +x /usr/local/bin/webcraft-*
```

## 🧪 Tests de Vérification

```bash
# Vérifier tous les services
pm2 status && systemctl status nginx

# Tester l'API
curl http://localhost:8001/api/

# Tester le site
curl -I http://localhost/

# Vérifier les ports
netstat -tlnp | grep -E ':(80|443|8001)'

# Status complet
webcraft-status

# Faire un backup
webcraft-backup
```

## 🔧 Commandes de Maintenance

```bash
# Redémarrer backend
pm2 restart webcraft-backend

# Redémarrer nginx
systemctl restart nginx

# Voir les logs
pm2 logs webcraft-backend --lines 20

# Backup manuel
webcraft-backup

# Status général
webcraft-status

# Renouveler SSL
certbot renew --dry-run
```

## 🚨 Dépannage Rapide

```bash
# Backend ne démarre pas
cd /var/www/webcraft/backend && source venv/bin/activate && python3 server.py

# Nginx erreur
nginx -t && systemctl status nginx

# Permissions incorrectes
chown -R www-data:www-data /var/www/webcraft

# Port 8001 occupé
killall python3 && pm2 restart webcraft-backend

# Logs détaillés
tail -f /var/log/webcraft/backend_error.log
```

**Variables à remplacer :**
- `VOTRE_DOMAINE` → `webcraft.votredomaine.com`
- `VOTRE_EMAIL` → `vous@email.com`
- `/path/to/webcraft` → chemin vers votre projet