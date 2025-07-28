# 🚀 WebCraft - Guide d'Installation Complet

## 📋 Résumé des Modifications

✅ **Base de données changée** : MongoDB → SQLite  
✅ **Backend adapté** : FastAPI + SQLAlchemy  
✅ **Frontend intégré** : Formulaire de contact fonctionnel  
✅ **Script d'installation automatique** : Ubuntu 24.04  
✅ **Configuration production** : Nginx + PM2 + SSL  

## 🎯 Installation sur VPS Ubuntu 24.04

### 1. Prérequis

- **VPS Ubuntu 24.04** (min 1GB RAM, 20GB stockage)
- **Nom de domaine** pointant vers votre IP
- **Accès root** au serveur
- **Email** pour SSL Let's Encrypt

### 2. Transfert du Package

```bash
# Télécharger le package depuis ce repository
wget https://github.com/votre-repo/webcraft_20250728_223742.tar.gz

# Ou utiliser SCP depuis votre machine locale
scp webcraft_20250728_223742.tar.gz root@votre-ip:/tmp/
```

### 3. Installation Automatique

```bash
# Connexion SSH
ssh root@votre-ip

# Extraction du package
cd /tmp
tar -xzf webcraft_20250728_223742.tar.gz
cd deploy_package

# Installation
./install.sh
```

Le script vous demandera :
- **Domaine** : `webcraft.votredomaine.com`
- **Email** : `votre@email.com`

## 📁 Structure de l'Installation

```
/var/www/webcraft/
├── backend/
│   ├── server.py           # API FastAPI
│   ├── webcraft.db         # Base SQLite
│   ├── requirements.txt    # Dépendances Python
│   ├── .env               # Variables d'environnement
│   └── venv/              # Environnement virtuel
├── frontend/
│   ├── build/             # Build React
│   ├── src/               # Code source
│   └── .env               # Variables frontend
└── ecosystem.config.js    # Configuration PM2
```

## 🔧 Services Installés

### Backend (PM2)
- **Port** : 8001
- **Processus** : `webcraft-backend`
- **Logs** : `/var/log/webcraft/`

### Frontend (Nginx)
- **Port** : 80/443
- **Build** : React optimisé
- **SSL** : Let's Encrypt automatique

### Base de données
- **Type** : SQLite
- **Fichier** : `/var/www/webcraft/backend/webcraft.db`
- **Backup** : Automatique quotidien

## 🛠️ Commandes de Gestion

### Commandes Principales
```bash
webcraft-status    # Statut complet du système
webcraft-backup    # Backup de la base de données
webcraft-update    # Mise à jour de l'application
```

### Gestion PM2 (Backend)
```bash
pm2 status                    # Statut des processus
pm2 logs webcraft-backend     # Logs temps réel
pm2 restart webcraft-backend  # Redémarrage
pm2 stop webcraft-backend     # Arrêt
```

### Gestion Nginx (Frontend)
```bash
systemctl status nginx    # Statut
systemctl restart nginx   # Redémarrage
nginx -t                 # Test configuration
```

## 📊 Monitoring et Logs

### Logs de l'Application
```bash
# Backend
tail -f /var/log/webcraft/backend.log

# Nginx
tail -f /var/log/nginx/webcraft_access.log
tail -f /var/log/nginx/webcraft_error.log

# PM2
pm2 logs webcraft-backend
```

### Base de Données
```bash
# Taille de la base
du -h /var/www/webcraft/backend/webcraft.db

# Backup manuel
cp /var/www/webcraft/backend/webcraft.db /var/backups/webcraft_$(date +%Y%m%d).db
```

## 🔐 Sécurité Configurée

✅ **UFW Firewall** : Ports 22, 80, 443  
✅ **SSL Let's Encrypt** : Renouvellement automatique  
✅ **Headers sécurisés** : X-Frame-Options, CSP, etc.  
✅ **Isolation utilisateur** : www-data  
✅ **Logs sécurisés** : Rotation quotidienne  

## 🎯 Test de Fonctionnement

### 1. Vérification des Services
```bash
webcraft-status
```

### 2. Test du Site
```bash
curl -I https://votre-domaine.com
```

### 3. Test API
```bash
curl https://votre-domaine.com/api/
```

### 4. Test Formulaire de Contact
Rendez-vous sur votre site et testez le formulaire.

## 🔄 Maintenance

### Mise à jour de l'Application
```bash
webcraft-update
```

### Renouvellement SSL
```bash
certbot certificates
certbot renew --dry-run
```

### Mise à jour Ubuntu
```bash
apt update && apt upgrade -y
```

## 🐛 Dépannage

### Site inaccessible
```bash
systemctl status nginx
pm2 status
netstat -tlnp | grep :80
```

### Erreurs Backend
```bash
pm2 logs webcraft-backend
cat /var/log/webcraft/backend_error.log
```

### Base de données
```bash
ls -la /var/www/webcraft/backend/webcraft.db
# Restaurer depuis backup si nécessaire
```

## 📝 Personnalisation

### Modifier le contenu
Les fichiers sont dans `/var/www/webcraft/frontend/src/`

### Ajouter des fonctionnalités
1. Modifier le code source
2. Rebuild le frontend : `cd frontend && yarn build`
3. Redémarrer : `pm2 restart webcraft-backend`

### Configuration avancée
- **Nginx** : `/etc/nginx/sites-available/webcraft`
- **PM2** : `/var/www/webcraft/ecosystem.config.js`
- **Env Backend** : `/var/www/webcraft/backend/.env`
- **Env Frontend** : `/var/www/webcraft/frontend/.env`

## 🎉 Félicitations !

Votre site WebCraft est maintenant :
- ✅ **Déployé** sur votre VPS Ubuntu 24.04
- ✅ **Sécurisé** avec SSL et firewall
- ✅ **Optimisé** pour la production
- ✅ **Monitoré** avec des logs complets
- ✅ **Fonctionnel** avec base SQLite

**Accédez à votre site : https://votre-domaine.com**

---

## 💡 Support

Pour toute question ou problème :
1. Consultez les logs avec `webcraft-status`
2. Vérifiez les services avec `pm2 status`
3. Testez la connectivité avec `curl`
4. Consultez le README.md détaillé

**Votre site WebCraft est prêt à recevoir vos visiteurs ! 🚀**