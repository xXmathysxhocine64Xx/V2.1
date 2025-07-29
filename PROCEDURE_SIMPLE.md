# 🚀 WebCraft - Procédure Simplifiée

## ⚡ Installation Ultra-Rapide (3 min)

### 📋 Ce dont vous avez besoin :
- Serveur Ubuntu 24.04
- Nom de domaine (ex: monsite.com)
- Email pour SSL

### 🎯 Installation en 3 étapes :

#### 1. Connexion au serveur
```bash
ssh root@VOTRE-IP-SERVEUR
```

#### 2. Installation automatique
```bash
# Télécharger les fichiers WebCraft sur votre serveur
# Puis lancer :
./deploy_simple.sh
```

#### 3. Configuration (questions simples)
```
🌐 Votre domaine: monsite.com
📧 Votre email: contact@monsite.com
```

### ✅ C'est terminé !
Votre site est en ligne sur **https://monsite.com**

---

## 🔧 Gestion Super Simple

### Voir si tout fonctionne
```bash
pm2 status                    # Backend actif ?
systemctl status nginx        # Serveur web actif ?
```

### En cas de problème
```bash
pm2 logs webcraft-backend     # Voir les erreurs
pm2 restart webcraft-backend  # Redémarrer
```

### Tester l'installation
```bash
./test_webcraft.sh monsite.com
```

---

## 🏗️ Architecture Ultra-Simple

```
Ubuntu 24.04
├── Site Web (React) → Port 80/443 (Nginx)
├── API (Python) → Port 8001 (PM2)  
├── Données → Fichier JSON local
└── SSL → Let's Encrypt gratuit
```

**Fini les complications :**
- ❌ Plus de base de données complexe
- ❌ Plus de 20 étapes manuelles  
- ❌ Plus de 500 lignes de documentation
- ❌ Plus de scripts multiples

**Maintenant c'est simple :**
- ✅ 1 seule commande d'installation
- ✅ 3 minutes chrono
- ✅ SSL automatique
- ✅ Tout fonctionne immédiatement

---

## 🎉 Résultat

**Votre site professionnel WebCraft :**
- 🌐 **Site** : https://monsite.com
- 📧 **Contact** : Formulaire intégré
- 🔒 **Sécurisé** : HTTPS + Firewall
- 📱 **Responsive** : Mobile + Desktop

**Installation = 3 minutes. Point final !** ⏱️

---

*WebCraft 2.0 - L'art de la simplicité* 🎨