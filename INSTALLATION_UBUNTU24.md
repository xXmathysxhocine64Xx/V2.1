# 🚀 Installation WebCraft Simple - Ubuntu Server 24.04

## Guide d'installation ultra-simple

Cette procédure remplace complètement l'ancienne installation complexe. **3 commandes suffiront !**

---

## 📋 Prérequis

- Ubuntu Server 24.04 LTS
- Accès root ou sudo
- Nom de domaine pointant vers votre IP
- Connexion Internet

---

## ⚡ Installation Rapide (3 étapes)

### Étape 1 : Préparation du système

```bash
# Mise à jour et installation des outils de base
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip python3-venv nginx certbot python3-certbot-nginx git

# Vérification
node --version  # Doit afficher v18.x.x ou plus
python3 --version  # Doit afficher v3.12.x ou plus
```

### Étape 2 : Installation de WebCraft

```bash
# Téléchargement des fichiers WebCraft (remplacez par votre source)
git clone https://github.com/votre-repo/webcraft.git /var/www/webcraft
# OU upload de vos fichiers dans /var/www/webcraft

cd /var/www/webcraft

# Installation Backend Python (avec environnement virtuel pour Ubuntu 24.04)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Installation Frontend React
cd ../frontend
npm install
npm run build
```

### Étape 3 : Démarrage et configuration

```bash
# Installation de PM2 pour la gestion des processus
sudo npm install -g pm2

# Démarrage du backend WebCraft (avec environnement virtuel)
cd /var/www/webcraft/backend
source venv/bin/activate
pm2 start "python server.py" --name "webcraft-backend" --interpreter ./venv/bin/python
pm2 startup
pm2 save

# Configuration Nginx avec votre domaine
sudo tee /etc/nginx/sites-available/webcraft > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Remplacez par votre domaine
    
    # Frontend React (build statique)
    location / {
        root /var/www/webcraft/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Activation du site
sudo ln -s /etc/nginx/sites-available/webcraft /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Configuration SSL automatique
sudo certbot --nginx -d your-domain.com
```

---

## 🎉 C'est terminé !

**Votre site WebCraft est accessible sur :**
- **Site web** : https://your-domain.com
- **API** : https://your-domain.com/api/

---

## 🔧 Commandes de gestion

### Gestion PM2 (Backend)
```bash
# Voir le statut
pm2 status

# Redémarrer
pm2 restart webcraft-backend

# Voir les logs
pm2 logs webcraft-backend

# Arrêter
pm2 stop webcraft-backend
```

### Gestion Nginx (Frontend)
```bash
# Statut
sudo systemctl status nginx

# Redémarrer
sudo systemctl restart nginx

# Test configuration
sudo nginx -t
```

### Mise à jour
```bash
cd /var/www/webcraft
git pull  # Ou upload des nouveaux fichiers

# Backend
cd backend
pip3 install -r requirements.txt
pm2 restart webcraft-backend

# Frontend
cd ../frontend
npm install
npm run build
```

---

## 🆚 Comparaison avec l'ancienne installation

| Aspect | Ancienne version | Nouvelle version |
|--------|------------------|------------------|
| **Étapes** | 🔴 15+ étapes | 🟢 3 étapes |
| **Temps** | 🔴 30+ minutes | 🟢 5 minutes |
| **Scripts** | 🔴 5+ scripts complexes | 🟢 Commandes simples |
| **Base de données** | 🔴 SQLite + migrations | 🟢 JSON local |
| **Complexité** | 🔴 Très élevée | 🟢 Très simple |
| **Erreurs** | 🔴 Nombreuses | 🟢 Rares |

---

## 🛡️ Sécurité (Incluse automatiquement)

### SSL avec Let's Encrypt
```bash
# Déjà configuré à l'étape 3, mais pour renouveler :
sudo certbot renew --dry-run
```

### Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

---

## 🚨 Dépannage

### Backend ne démarre pas
```bash
# Vérifier les logs
pm2 logs webcraft-backend

# Vérifier les dépendances
cd /var/www/webcraft/backend
pip3 install -r requirements.txt

# Redémarrer
pm2 restart webcraft-backend
```

### Erreur 502 Bad Gateway
```bash
# Vérifier que le backend tourne sur le port 8001
pm2 status
curl http://localhost:8001/api/

# Vérifier Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Formulaire de contact ne fonctionne pas
```bash
# Tester l'API directement
curl -X GET http://localhost:8001/api/
curl -X GET http://localhost:8001/api/health

# Vérifier les données
ls -la /var/www/webcraft/backend/data.json
```

---

## 📊 Avantages de cette nouvelle approche

### ✅ **Simplicité extrême**
- **3 commandes** au lieu de 15+ étapes
- **Installation en 5 minutes** au lieu de 30+ minutes
- **FastAPI + React** au lieu de stack complexe

### ✅ **Stabilité maximale**
- **Stockage JSON** = pas de DB à configurer
- **PM2 + Nginx** = stack éprouvé
- **4 dépendances** = moins de problèmes

### ✅ **Performance optimale**
- **React build optimisé** = chargement ultra-rapide
- **FastAPI** = API ultra-performante
- **Nginx proxy** = gestion optimale des requêtes

### ✅ **Maintenance simplifiée**
- **Commandes PM2** standard
- **Logs centralisés** avec PM2
- **SSL automatique** avec Let's Encrypt

---

## 🎯 Recommandations

### **Ubuntu Server 24.04** vs autres versions
**Ubuntu 24.04 est recommandé** pour ce projet car :
- ✅ **Python 3.12** intégré
- ✅ **Node.js 18+** disponible
- ✅ **Support LTS** jusqu'en 2029
- ✅ **Nginx moderne** dans les dépôts

### **Conseils de production**
- Utilisez un **domaine personnalisé**
- SSL/TLS **activé automatiquement**
- Firewall **configuré par défaut**
- **Backup des données** : `/var/www/webcraft/backend/data.json`

---

## 🎊 Conclusion

Cette nouvelle approche transforme complètement l'expérience d'installation :

- **Avant** : 15+ étapes, scripts multiples, 30+ minutes, erreurs fréquentes
- **Maintenant** : 3 étapes, commandes simples, 5 minutes, installation fiable

**WebCraft est maintenant simple, rapide et stable !**

---

*Guide créé pour WebCraft - Site Web Moderne*  
*Refonte complète axée sur la simplicité d'installation*