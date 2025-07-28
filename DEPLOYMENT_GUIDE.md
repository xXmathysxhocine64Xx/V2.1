# 🚀 Procédure Complète de Déploiement WebCraft sur VPS Ubuntu 24.04

## 📋 Vue d'ensemble

Cette procédure vous guide étape par étape pour déployer votre application WebCraft sur un VPS Ubuntu 24.04 via SSH, avec une configuration de production complète incluant Nginx, SSL, PM2 et base de données SQLite.

## 🎯 Architecture de Déploiement

```
VPS Ubuntu 24.04
├── Frontend (React) → Nginx (Port 80/443)
├── Backend (FastAPI) → PM2 (Port 8001) 
├── Base de données → SQLite
├── SSL → Let's Encrypt
└── Monitoring → PM2 + Logs
```

---

## 🔧 ÉTAPE 1 : Préparatifs Locaux

### 1.1 Vérification de l'Application
```bash
# Sur votre machine de développement
cd /path/to/your/webcraft/project

# Vérifier la structure
ls -la
# Doit contenir : backend/, frontend/, deploy/

# Tester l'application localement (optionnel)
cd backend && python3 server.py
cd ../frontend && yarn start
```

### 1.2 Création du Package de Déploiement
```bash
# Exécuter le script de packaging
chmod +x deploy/package.sh
./deploy/package.sh

# Un fichier sera créé : webcraft_YYYYMMDD_HHMMSS.tar.gz
ls -la webcraft_*.tar.gz
```

### 1.3 Préparation des Informations Nécessaires
**Informations requises :**
- **IP VPS** : `123.456.789.012`
- **Nom de domaine** : `webcraft.votredomaine.com`
- **Email SSL** : `votre@email.com`
- **Utilisateur SSH** : `root` ou utilisateur avec sudo

---

## 🖥️ ÉTAPE 2 : Connexion SSH et Préparation du VPS

### 2.1 Connexion SSH au VPS
```bash
# Connexion SSH au VPS
ssh root@123.456.789.012

# Ou avec utilisateur non-root
ssh utilisateur@123.456.789.012
```

### 2.2 Vérification Système
```bash
# Vérifier la version Ubuntu
lsb_release -a
# Doit afficher Ubuntu 24.04

# Vérifier l'espace disque
df -h
# Minimum recommandé : 2GB libre

# Vérifier la mémoire
free -h
# Minimum recommandé : 1GB RAM
```

### 2.3 Mise à Jour Système
```bash
# Mise à jour complète
sudo apt update && sudo apt upgrade -y

# Installer les outils essentiels
sudo apt install -y curl wget git unzip htop
```

---

## 📦 ÉTAPE 3 : Transfert des Fichiers

### 3.1 Transfert du Package (depuis votre machine locale)
```bash
# Ouvrir un nouveau terminal local
# Transférer le package vers le VPS
scp webcraft_*.tar.gz root@123.456.789.012:/tmp/

# Ou avec utilisateur non-root
scp webcraft_*.tar.gz utilisateur@123.456.789.012:/tmp/
```

### 3.2 Extraction sur le VPS
```bash
# Retour sur le terminal SSH du VPS
cd /tmp

# Lister les fichiers transférés
ls -la webcraft_*.tar.gz

# Extraire le package
tar -xzf webcraft_*.tar.gz
cd deploy_package

# Vérifier le contenu
ls -la
# Doit contenir : backend/, frontend/, install.sh, README.md, VERSION
```

---

## ⚙️ ÉTAPE 4 : Installation Automatique

### 4.1 Lancement du Script d'Installation
```bash
# Rendre le script exécutable
chmod +x install.sh

# Lancer l'installation
sudo ./install.sh
```

### 4.2 Configuration Interactive
Le script vous demandera :

```
=== Configuration WebCraft ===
Nom de domaine (ex: webcraft.votredomaine.com): webcraft.votredomaine.com
Email pour SSL (Let's Encrypt): votre@email.com

Configuration:
  Domaine: webcraft.votredomaine.com
  Email: votre@email.com
  Répertoire: /var/www/webcraft

Continuer avec cette configuration? (y/n): y
```

### 4.3 Processus d'Installation Automatique
Le script effectuera automatiquement :

- ✅ **Mise à jour système**
- ✅ **Installation des dépendances** (Node.js, Python, Nginx, PM2)
- ✅ **Configuration firewall UFW**
- ✅ **Création des répertoires**
- ✅ **Installation de l'application**
- ✅ **Installation dépendances Python/Node**
- ✅ **Build du frontend React**
- ✅ **Configuration PM2** pour le backend
- ✅ **Configuration Nginx** avec proxy
- ✅ **Configuration SSL** Let's Encrypt
- ✅ **Initialisation base de données** SQLite
- ✅ **Création scripts de maintenance**

---

## 🔍 ÉTAPE 5 : Vérifications Post-Installation

### 5.1 Vérification des Services
```bash
# Status global WebCraft
webcraft-status

# Status PM2 (Backend)
pm2 status

# Status Nginx
sudo systemctl status nginx

# Vérification des ports
sudo netstat -tlnp | grep -E ':(80|443|8001)'
```

### 5.2 Test de Connectivité
```bash
# Test backend direct
curl http://localhost:8001/api/

# Test frontend via Nginx
curl -I http://localhost/

# Test SSL (remplacez par votre domaine)
curl -I https://webcraft.votredomaine.com/

# Script de test intégré
sudo /var/www/webcraft/deploy/webcraft-service.sh test
```

### 5.3 Vérification des Fichiers
```bash
# Structure installée
ls -la /var/www/webcraft/
# Doit contenir : backend/, frontend/, ecosystem.config.js

# Base de données
ls -la /var/www/webcraft/backend/webcraft.db

# Logs
ls -la /var/log/webcraft/

# Configuration Nginx
ls -la /etc/nginx/sites-enabled/webcraft
```

---

## 🌐 ÉTAPE 6 : Configuration DNS et Accès

### 6.1 Configuration DNS
**Sur votre registrar de domaine :**
```
Type: A
Nom: webcraft (ou @)
Valeur: 123.456.789.012 (IP de votre VPS)
TTL: 300
```

### 6.2 Test d'Accès Public
```bash
# Test depuis le VPS
curl -I https://webcraft.votredomaine.com/

# Test de l'API
curl https://webcraft.votredomaine.com/api/

# Depuis votre navigateur local
# Ouvrez : https://webcraft.votredomaine.com
```

---

## 📊 ÉTAPE 7 : Monitoring et Logs

### 7.1 Surveillance des Services
```bash
# Monitoring en temps réel
pm2 monit

# Logs backend en temps réel
pm2 logs webcraft-backend

# Logs Nginx
sudo tail -f /var/log/nginx/webcraft_access.log
sudo tail -f /var/log/nginx/webcraft_error.log

# Logs système
sudo tail -f /var/log/syslog
```

### 7.2 Scripts de Maintenance Disponibles
```bash
# Status complet du système
webcraft-status

# Backup de la base de données
webcraft-backup

# Mise à jour de l'application
webcraft-update

# Gestion des services
/var/www/webcraft/deploy/webcraft-service.sh [start|stop|restart|status|logs|test]
```

---

## 🔒 ÉTAPE 8 : Sécurisation

### 8.1 Vérification Firewall
```bash
# Status UFW
sudo ufw status verbose

# Doit afficher :
# 22/tcp ALLOW IN
# 80/tcp ALLOW IN  
# 443/tcp ALLOW IN
# 80,443/tcp (Nginx Full) ALLOW IN
```

### 8.2 Vérification SSL
```bash
# Certificats SSL
sudo certbot certificates

# Test renouvellement
sudo certbot renew --dry-run

# Vérification cron auto-renewal
sudo crontab -l | grep certbot
```

### 8.3 Permissions et Sécurité
```bash
# Vérifier les permissions
ls -la /var/www/webcraft/
# Propriétaire : www-data:www-data

# Vérifier la base de données
ls -la /var/www/webcraft/backend/webcraft.db
# Propriétaire : www-data:www-data
```

---

## 🚨 ÉTAPE 9 : Dépannage

### 9.1 Problèmes Courants

**🔧 Backend non accessible :**
```bash
# Vérifier PM2
pm2 status
pm2 logs webcraft-backend

# Redémarrer backend
pm2 restart webcraft-backend

# Vérifier les dépendances Python
cd /var/www/webcraft/backend
source venv/bin/activate
pip list
```

**🔧 Frontend non accessible :**
```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier le build
ls -la /var/www/webcraft/frontend/build/

# Redémarrer Nginx
sudo systemctl restart nginx
```

**🔧 SSL ne fonctionne pas :**
```bash
# Vérifier les certificats
sudo certbot certificates

# Renouveler manuellement
sudo certbot --nginx -d webcraft.votredomaine.com

# Vérifier la configuration Nginx
sudo nginx -t
```

### 9.2 Logs de Débogage
```bash
# Logs détaillés backend
tail -f /var/log/webcraft/backend.log
tail -f /var/log/webcraft/backend_error.log

# Logs Nginx détaillés
tail -f /var/log/nginx/webcraft_error.log

# Logs système
sudo journalctl -u nginx -f
sudo journalctl -f
```

### 9.3 Restauration
```bash
# Restaurer depuis backup
ls /var/backups/webcraft/

# Restaurer base de données
sudo cp /var/backups/webcraft/webcraft_YYYYMMDD.db /var/www/webcraft/backend/webcraft.db
sudo chown www-data:www-data /var/www/webcraft/backend/webcraft.db

# Redémarrer services
pm2 restart webcraft-backend
```

---

## 📋 ÉTAPE 10 : Commandes de Maintenance

### 10.1 Commandes Quotidiennes
```bash
# Status global
webcraft-status

# Backup manuel
webcraft-backup

# Test de fonctionnement
curl -I https://webcraft.votredomaine.com/api/
```

### 10.2 Mise à Jour de l'Application
```bash
# 1. Faire un backup
webcraft-backup

# 2. Transférer nouveau package
scp nouveau_webcraft_*.tar.gz root@123.456.789.012:/tmp/

# 3. Sur le VPS
cd /tmp
tar -xzf nouveau_webcraft_*.tar.gz
cd deploy_package
sudo ./install.sh
```

### 10.3 Surveillance Proactive
```bash
# Vérifier l'espace disque
df -h /var/www/webcraft/

# Vérifier la mémoire
free -h

# Vérifier les processus
ps aux | grep -E '(nginx|pm2|python)'

# Vérifier les connexions
sudo netstat -tulpn | grep -E ':(80|443|8001)'
```

---

## 🎉 RÉSUMÉ DE L'INSTALLATION

### ✅ Configuration Finale

**Services installés et configurés :**
- ✅ **Frontend React** → Build optimisé servi par Nginx
- ✅ **Backend FastAPI** → Géré par PM2 sur port 8001
- ✅ **Base SQLite** → `/var/www/webcraft/backend/webcraft.db`
- ✅ **Nginx** → Proxy inverse et serveur web (ports 80/443)
- ✅ **SSL Let's Encrypt** → Certificats automatiques
- ✅ **Firewall UFW** → Ports 22, 80, 443 ouverts
- ✅ **Monitoring** → PM2 + logs rotatifs
- ✅ **Scripts maintenance** → Backup, update, status

**URLs d'accès :**
- 🌐 **Site web** : `https://webcraft.votredomaine.com`
- 🔧 **API** : `https://webcraft.votredomaine.com/api/`

**Fichiers importants :**
- **Application** : `/var/www/webcraft/`
- **Logs** : `/var/log/webcraft/`
- **Nginx config** : `/etc/nginx/sites-available/webcraft`
- **PM2 config** : `/var/www/webcraft/ecosystem.config.js`
- **Backups** : `/var/backups/webcraft/`

### 🛠️ Commandes de Gestion

```bash
# Status général
webcraft-status

# Gestion des services
pm2 status                    # Backend
sudo systemctl status nginx   # Frontend/Proxy

# Logs
pm2 logs webcraft-backend     # Logs backend
sudo tail -f /var/log/nginx/webcraft_access.log  # Logs accès

# Maintenance
webcraft-backup               # Backup
webcraft-update               # Mise à jour
```

---

## 🎯 DÉPLOIEMENT TERMINÉ !

**Votre application WebCraft est maintenant :**

- 🚀 **Déployée** sur VPS Ubuntu 24.04
- 🔒 **Sécurisée** avec SSL et firewall
- ⚡ **Optimisée** pour la production
- 📊 **Monitorée** avec logs et métriques
- 🔄 **Maintenable** avec scripts automatisés

**Accédez à votre site : https://webcraft.votredomaine.com**

---

## 📞 Support et Maintenance

**En cas de problème :**
1. Exécutez `webcraft-status` pour diagnostiquer
2. Consultez les logs avec `pm2 logs webcraft-backend`
3. Testez la connectivité avec `/var/www/webcraft/deploy/webcraft-service.sh test`
4. Vérifiez les certificats SSL avec `sudo certbot certificates`

**Votre site WebCraft est prêt à recevoir vos visiteurs ! 🎉**