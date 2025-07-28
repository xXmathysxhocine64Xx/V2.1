# 🚀 Déploiement WebCraft - Procédure Express

## Installation en 5 commandes

### 1. Créer le package
```bash
cd /votre/projet/webcraft
./deploy/package.sh
```

### 2. Transférer sur VPS
```bash
scp webcraft_*.tar.gz root@VOTRE_IP:/tmp/
```

### 3. Se connecter au VPS
```bash
ssh root@VOTRE_IP
```

### 4. Installer automatiquement
```bash
cd /tmp && tar -xzf webcraft_*.tar.gz && cd deploy_package && ./install.sh
```

### 5. Configurer (interactif)
```
Domaine: webcraft.votredomaine.com
Email: votre@email.com
Confirmer: y
```

## C'est tout ! ✅

**Votre site sera disponible sur : `https://webcraft.votredomaine.com`**

---

## Commandes de maintenance

```bash
# Status
webcraft-status

# Backup
webcraft-backup  

# Logs
pm2 logs webcraft-backend

# Redémarrer
pm2 restart webcraft-backend
```

---

## One-liner complet (pour les experts)
```bash
# Sur votre machine locale
./deploy/package.sh && scp webcraft_*.tar.gz root@VOTRE_IP:/tmp/

# Sur le VPS (via SSH)
cd /tmp && tar -xzf webcraft_*.tar.gz && cd deploy_package && ./install.sh
```

**Total : 2 commandes + configuration interactive = Site en ligne ! 🎉**