# 🚀 WebCraft - Installation Express

## ⚡ 3 Étapes - 5 Minutes - C'est Prêt !

### 📋 Prérequis
- Ubuntu Server 24.04
- Domaine pointant vers votre IP
- Accès sudo

---

### 🛠️ Installation

#### Étape 1 : Système
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip nginx certbot python3-certbot-nginx git
```

#### Étape 2 : WebCraft
```bash
# Copiez vos fichiers dans /var/www/webcraft
cd /var/www/webcraft
cd backend && pip3 install -r requirements.txt
cd ../frontend && npm install && npm run build
```

#### Étape 3 : Configuration
```bash
sudo npm install -g pm2
cd /var/www/webcraft/backend
pm2 start "python3 server.py" --name "webcraft-backend"
pm2 startup && pm2 save

# Configuration Nginx (remplacez your-domain.com)
sudo tee /etc/nginx/sites-available/webcraft > /dev/null << 'EOF' 
server {
    listen 80;
    server_name your-domain.com;
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

sudo ln -s /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d your-domain.com
```

---

### ✅ Terminé !
**Site : https://your-domain.com**

### 🔧 Gestion
```bash
pm2 status                    # Backend
pm2 logs webcraft-backend     # Logs
systemctl status nginx        # Frontend
```

**Installation = 5 minutes !** ⏱️