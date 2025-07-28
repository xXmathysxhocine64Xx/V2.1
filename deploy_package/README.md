# WebCraft - Guide d'Installation sur Ubuntu 24.04

Ce guide vous permet d'installer WebCraft sur votre VPS Ubuntu 24.04 avec une configuration complète en production.

## 📋 Prérequis

- **VPS Ubuntu 24.04** (minimum 1GB RAM, 20GB stockage)
- **Nom de domaine** pointant vers votre VPS
- **Accès root** au serveur
- **Email valide** pour SSL Let's Encrypt

## 🚀 Installation Rapide

### 1. Connexion à votre VPS

```bash
ssh root@votre-ip-serveur
```

### 2. Téléchargement des fichiers

```bash
# Créer un répertoire temporaire
mkdir -p /tmp/webcraft-install
cd /tmp/webcraft-install

# Télécharger les fichiers du projet
# (Remplacez par votre méthode de transfert préférée)
```

### 3. Copier les fichiers sur votre VPS

Vous pouvez utiliser plusieurs méthodes :

#### Option A: SCP (depuis votre machine locale)
```bash
# Copier le dossier backend
scp -r ./backend root@votre-ip:/tmp/webcraft-install/

# Copier le dossier frontend  
scp -r ./frontend root@votre-ip:/tmp/webcraft-install/

# Copier le script d'installation
scp ./deploy/install.sh root@votre-ip:/tmp/webcraft-install/
```

#### Option B: Git (si vous avez un repository)
```bash
git clone https://github.com/votre-username/webcraft.git /tmp/webcraft-install
```

#### Option C: Transfert manuel
Utilisez FileZilla, WinSCP ou tout autre client FTP/SFTP pour transférer les dossiers.

### 4. Exécution de l'installation

```bash
cd /tmp/webcraft-install
chmod +x install.sh
./install.sh
```

Le script vous demandera :
- **Nom de domaine** (ex: webcraft.votredomaine.com)
- **Email** pour SSL Let's Encrypt

## 📁 Structure après installation

```
/var/www/webcraft/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── .env
│   ├── venv/
│   └── webcraft.db
├── frontend/
│   ├── build/
│   ├── package.json
│   └── .env
└── ecosystem.config.js
```

## 🔧 Configuration DNS

Avant l'installation, configurez votre DNS :

```
Type: A
Nom: webcraft (ou votre sous-domaine)
Valeur: IP-de-votre-VPS
TTL: 300
```

## 🛠️ Commandes utiles

Après l'installation, vous disposez de ces commandes :

### Statut du système
```bash
webcraft-status
```

### Backup de la base de données
```bash
webcraft-backup
```

### Mise à jour de l'application
```bash
webcraft-update
```

### Gestion PM2 (Backend)
```bash
pm2 status              # Statut des processus
pm2 logs webcraft-backend  # Logs du backend
pm2 restart webcraft-backend  # Redémarrage
pm2 stop webcraft-backend     # Arrêt
pm2 start webcraft-backend    # Démarrage
```

### Gestion Nginx
```bash
systemctl status nginx    # Statut
systemctl restart nginx   # Redémarrage
systemctl reload nginx    # Rechargement config
nginx -t                 # Test configuration
```

## 📊 Monitoring

### Logs de l'application
```bash
# Logs backend
tail -f /var/log/webcraft/backend.log

# Logs Nginx
tail -f /var/log/nginx/webcraft_access.log
tail -f /var/log/nginx/webcraft_error.log

# Logs système
journalctl -u nginx -f
```

### Base de données
```bash
# Localisation
ls -la /var/www/webcraft/backend/webcraft.db

# Backup manuel
cp /var/www/webcraft/backend/webcraft.db /var/backups/webcraft_manual_$(date +%Y%m%d).db
```

## 🔐 Sécurité

Le script configure automatiquement :
- **UFW Firewall** (ports 22, 80, 443)
- **SSL Let's Encrypt** (renouvellement automatique)
- **Headers de sécurité** dans Nginx
- **Isolation utilisateur** (www-data)

## 📝 Maintenance

### Renouvellement SSL automatique
```bash
# Vérifier le statut
certbot certificates

# Test de renouvellement
certbot renew --dry-run
```

### Mise à jour Ubuntu
```bash
apt update && apt upgrade -y
```

### Backup automatique
Les backups sont créés quotidiennement et conservés 7 jours.

## 🐛 Dépannage

### Site inaccessible
```bash
# Vérifier Nginx
systemctl status nginx
nginx -t

# Vérifier PM2
pm2 status
pm2 logs webcraft-backend

# Vérifier les ports
netstat -tlnp | grep :80
netstat -tlnp | grep :443
netstat -tlnp | grep :8001
```

### Erreurs SSL
```bash
# Vérifier les certificats
certbot certificates

# Renouveler manuellement
certbot renew
```

### Base de données corrompue
```bash
# Restaurer depuis backup
cp /var/backups/webcraft/webcraft_YYYYMMDD_HHMMSS.db /var/www/webcraft/backend/webcraft.db
chown www-data:www-data /var/www/webcraft/backend/webcraft.db
pm2 restart webcraft-backend
```

## 🔄 Mise à jour manuelle

Pour mettre à jour l'application :

```bash
# 1. Backup
webcraft-backup

# 2. Arrêter l'application
pm2 stop webcraft-backend

# 3. Mettre à jour les fichiers
cd /var/www/webcraft

# 4. Backend
cd backend
source venv/bin/activate
pip install --upgrade -r requirements.txt

# 5. Frontend (si nécessaire)
cd ../frontend
yarn install
yarn build

# 6. Redémarrer
pm2 start webcraft-backend
systemctl reload nginx
```

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs avec `webcraft-status`
2. Consultez les logs détaillés dans `/var/log/webcraft/`
3. Vérifiez la configuration DNS
4. Assurez-vous que les ports sont ouverts

## 🎯 Prochaines étapes

Après l'installation :
1. Testez votre site sur `https://votre-domaine.com`
2. Configurez les sauvegardes automatiques
3. Ajoutez un monitoring (optionnel)
4. Personnalisez le contenu selon vos besoins

---

**✅ Votre site WebCraft est maintenant opérationnel !**