# 🚀 WebCraft - Installation Ultra-Simple Ubuntu 24.04

## Installation en 3 minutes chrono ! ⏱️

### Prérequis
- **Serveur Ubuntu 24.04** 
- **Domaine pointant vers votre IP** (ex: monsite.com → 123.45.67.89)
- **Accès root** au serveur

---

## 🎯 Installation Complète en UNE Commande

### 1. Connexion au serveur
```bash
ssh root@VOTRE-IP
```

### 2. Téléchargement et installation
```bash
curl -sSL https://raw.githubusercontent.com/votre-repo/webcraft/main/deploy_simple.sh | sudo bash
```

**OU**

```bash
# Si vous avez les fichiers localement
scp -r webcraft/ root@VOTRE-IP:/tmp/
ssh root@VOTRE-IP
cd /tmp/webcraft
chmod +x deploy_simple.sh
./deploy_simple.sh
```

### 3. Configuration interactive
Le script vous demandera :
```
🌐 Votre domaine (ex: monsite.com): [VOTRE-DOMAINE]
📧 Votre email pour SSL: [VOTRE-EMAIL]
```

### 4. Attendre la fin (2-3 minutes)
```
🚀 WebCraft - Installation Ultra-Simple
📦 Installation des outils...
📁 Création des dossiers...
🐍 Configuration du backend Python...
⚛️  Configuration du frontend React...
🌐 Configuration Nginx...
🔧 Démarrage du backend...
🔒 Configuration SSL...
🛡️  Configuration du firewall...

🎉 INSTALLATION TERMINÉE !
✅ Site web: https://votredomaine.com
✅ API: https://votredomaine.com/api/
🚀 Votre site WebCraft est prêt !
```

---

## ✅ C'est fini !

Votre site est automatiquement :
- ✅ **Installé** et configuré
- ✅ **Sécurisé** avec SSL gratuit
- ✅ **Optimisé** pour la production
- ✅ **Accessible** sur votre domaine

---

## 🛠️ Gestion Simple

### Vérifier le statut
```bash
pm2 status                    # Backend
systemctl status nginx        # Frontend/Proxy
```

### Voir les logs
```bash
pm2 logs webcraft-backend     # Logs du backend
```

### Redémarrer si besoin
```bash
pm2 restart webcraft-backend  # Redémarrer le backend
systemctl restart nginx       # Redémarrer nginx
```

---

## 🔧 Architecture Simple

```
Ubuntu 24.04
├── Frontend (React) → Nginx → Port 80/443
├── Backend (FastAPI) → PM2 → Port 8001
├── Données → JSON local (pas de DB complexe)
└── SSL → Let's Encrypt automatique
```

### Fichiers importants
- **Site web** : `/var/www/webcraft/frontend/build/`
- **Backend** : `/var/www/webcraft/backend/server.py`
- **Données** : `/var/www/webcraft/backend/data.json`
- **Config Nginx** : `/etc/nginx/sites-available/webcraft`

---

## 🚨 Dépannage Express

### Site inaccessible ?
```bash
systemctl status nginx
pm2 status
```

### Erreur SSL ?
```bash
certbot certificates
certbot renew
```

### Logs d'erreur ?
```bash
pm2 logs webcraft-backend
tail -f /var/log/nginx/error.log
```

---

## 🎉 Terminé !

**Votre site WebCraft moderne est maintenant en ligne sur https://votredomaine.com**

- ⚡ **Ultra-rapide** : Installation en 3 minutes
- 🛡️ **Sécurisé** : SSL automatique + firewall
- 📱 **Responsive** : Fonctionne sur tous les appareils
- 🔧 **Simple** : Aucune configuration complexe
- 💚 **Stable** : Architecture éprouvée

---

*Plus besoin de configurations complexes, scripts multiples ou documentations de 500 lignes !*
*Une seule commande et votre site professionnel est prêt ! 🚀*