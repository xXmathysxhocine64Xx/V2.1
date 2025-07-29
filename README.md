# 🚀 WebCraft - Site Web Moderne Ultra-Simple

**Version 2.0 - Installation en 3 étapes simples**

## 🎯 La simplicité avant tout !

Fini les configurations complexes ! **3 étapes simples** installent tout :
- ✅ **Frontend React** moderne et responsive
- ✅ **Backend FastAPI** ultra-performant  
- ✅ **SSL gratuit** avec Let's Encrypt
- ✅ **Sécurité** automatique (firewall + HTTPS)

---

## 🚀 Guide d'Installation

👉 **Suivez le guide complet** : [INSTALLATION_UBUNTU24.md](INSTALLATION_UBUNTU24.md)

### ⚠️ **Important Ubuntu 24.04**
**Python 3.12 impose l'utilisation d'environnements virtuels** (erreur "externally-managed-environment").  
Nos guides incluent automatiquement cette contrainte avec `python3 -m venv venv`.

### 🎯 Installation Automatique (Nouvelle)
```bash
# Script tout-en-un pour Ubuntu 24.04
chmod +x install_ubuntu24.sh
./install_ubuntu24.sh
```

### 📋 Installation Manuelle (3 étapes)

```bash
# 1. Préparation système
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip python3-venv nginx certbot python3-certbot-nginx git

# 2. Installation WebCraft avec environnement virtuel
cd /var/www/webcraft
cd backend
python3 -m venv venv          # Environnement virtuel obligatoire
source venv/bin/activate      # Activation
pip install -r requirements.txt
cd ../frontend && npm install && npm run build

# 3. Configuration et démarrage
pm2 start "python server.py" --name "webcraft-backend" --interpreter ./venv/bin/python
# Configuration Nginx + SSL (voir guide complet)
```

---

## 📋 Qu'est-ce qui a changé ?

### ✅ Nouveau (Ultra-Simple)
- **Installation** : 3 étapes simples, 5 minutes
- **Backend** : FastAPI avec stockage JSON (pas de DB complexe)
- **Configuration** : Commandes manuelles claires
- **Maintenance** : PM2 + Nginx (standards)

### ❌ Ancien (Trop Complexe)
- ~~5+ guides différents (500+ lignes)~~
- ~~Configuration SQLite/MongoDB~~
- ~~Scripts automatiques complexes~~
- ~~15+ étapes manuelles~~

---

## 🛠️ Gestion du Site

### Commandes essentielles
```bash
pm2 status                    # Voir le backend
pm2 logs webcraft-backend     # Logs en temps réel
systemctl status nginx        # Statut du web server
```

### Redémarrage si besoin
```bash
pm2 restart webcraft-backend  # Redémarrer l'API
systemctl restart nginx       # Redémarrer le serveur web
```

---

## 🏗️ Architecture

```
Votre Site WebCraft
├── 🌐 Frontend → /var/www/webcraft/frontend/build/
├── 🔧 Backend → /var/www/webcraft/backend/server.py
├── 💾 Données → /var/www/webcraft/backend/data.json
└── 🔒 SSL → Let's Encrypt (auto-renouvelé)
```

**Super simple :**
- **Pas de base de données** complexe (JSON local)
- **Pas de scripts** automatiques (commandes manuelles claires)
- **Pas de configuration** cachée (tout visible)

---

## 🎨 Fonctionnalités

### Frontend Moderne
- ✅ Design responsive et professionnel
- ✅ Animations CSS avancées
- ✅ Formulaire de contact intégré
- ✅ Optimisé pour mobile et desktop

### Backend Performant
- ✅ API REST moderne (FastAPI)
- ✅ Validation automatique des données
- ✅ Stockage JSON ultra-rapide
- ✅ Monitoring intégré

### Sécurité Incluse
- ✅ HTTPS automatique (SSL gratuit)
- ✅ Firewall configuré (UFW)
- ✅ Headers de sécurité
- ✅ Protection CORS

---

## 📞 Support

### Problème d'installation ?
1. Suivez le guide détaillé : [INSTALLATION_UBUNTU24.md](INSTALLATION_UBUNTU24.md)
2. Lancez `pm2 status` pour voir le backend
3. Testez `curl https://votredomaine.com/api/`

### Test de l'installation
```bash
./test_webcraft.sh votredomaine.com
```

---

## 🆚 Comparaison avec l'ancienne version

| Aspect | Ancienne version | Nouvelle version |
|--------|------------------|------------------|
| **Étapes** | 🔴 15+ étapes | 🟢 3 étapes |
| **Temps** | 🔴 30+ minutes | 🟢 5 minutes |
| **Scripts** | 🔴 5+ scripts complexes | 🟢 Commandes simples |
| **Base de données** | 🔴 SQLite + migrations | 🟢 JSON local |
| **Documentation** | 🔴 500+ lignes | 🟢 Guide clair |
| **Maintenance** | 🔴 Complexe | 🟢 PM2 standard |

---

## 🎉 Résultat Final

**Votre site professionnel WebCraft sera accessible sur :**
- 🌐 **Site principal** : https://votredomaine.com
- 🔧 **API** : https://votredomaine.com/api/
- 📧 **Contact** : Formulaire intégré fonctionnel

**Installation = 5 minutes. Maintenance = Simple !** ⏱️

---

*WebCraft 2.0 - L'art de la simplicité* 🚀
