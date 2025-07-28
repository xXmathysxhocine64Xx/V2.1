# 🔐 Guide Complet d'Installation SSH sur VPS Ubuntu Server 24.04

## 📋 Vue d'ensemble

Ce guide vous accompagne dans l'installation et la configuration sécurisée de SSH sur un VPS Ubuntu Server 24.04, avec toutes les bonnes pratiques de sécurité.

## 🎯 Objectifs
- ✅ Installation du serveur SSH OpenSSH
- ✅ Configuration sécurisée avec clés SSH
- ✅ Durcissement de la sécurité
- ✅ Configuration firewall UFW
- ✅ Tests complets de connectivité

---

## 🚀 ÉTAPE 1 : Préparatifs et Vérifications

### 1.1 Connexion initiale au VPS
```bash
# Connexion avec mot de passe (première fois)
ssh root@VOTRE_IP_VPS

# Ou avec utilisateur non-root si déjà configuré
ssh utilisateur@VOTRE_IP_VPS
```

### 1.2 Mise à jour du système
```bash
# Mise à jour complète du système
sudo apt update && sudo apt upgrade -y

# Vérification de la version Ubuntu
lsb_release -a
```

### 1.3 Vérification de l'état SSH actuel
```bash
# Vérifier si SSH est déjà installé
systemctl status ssh

# Vérifier le port SSH utilisé
sudo netstat -tlnp | grep :22
```

---

## 🔧 ÉTAPE 2 : Installation du Serveur SSH

### 2.1 Installation d'OpenSSH Server
```bash
# Mise à jour des paquets
sudo apt update

# Installation du paquet OpenSSH Server
sudo apt install openssh-server -y

# Démarrage du service SSH
sudo service ssh start

# Vérification du statut
sudo service ssh status

# Pour les systèmes avec systemd (optionnel)
# sudo systemctl enable ssh
# sudo systemctl start ssh
# sudo systemctl status ssh
```

### 2.2 Vérification de l'installation
```bash
# Vérifier que SSH écoute sur le port 22
sudo ss -tlnp | grep :22

# Vérifier la version SSH installée
ssh -V
```

---

## 🔐 ÉTAPE 3 : Génération et Configuration des Clés SSH

### 3.1 Génération des clés SSH (sur votre machine locale)
```bash
# Générer une paire de clés RSA 4096 bits
ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"

# Ou générer une clé Ed25519 (plus moderne et sécurisée)
ssh-keygen -t ed25519 -C "votre-email@example.com"

# Les clés seront sauvegardées dans ~/.ssh/
# - Clé privée : ~/.ssh/id_rsa (ou id_ed25519)
# - Clé publique : ~/.ssh/id_rsa.pub (ou id_ed25519.pub)
```

### 3.2 Copie de la clé publique vers le serveur
```bash
# Méthode 1 : Avec ssh-copy-id (recommandée)
ssh-copy-id -i ~/.ssh/id_rsa.pub utilisateur@VOTRE_IP_VPS

# Méthode 2 : Copie manuelle
cat ~/.ssh/id_rsa.pub | ssh utilisateur@VOTRE_IP_VPS "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 3.3 Configuration des permissions sur le serveur
```bash
# Sur le serveur VPS
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Vérifier les permissions
ls -la ~/.ssh/
```

---

## 🛡️ ÉTAPE 4 : Sécurisation de la Configuration SSH

### 4.1 Sauvegarde de la configuration originale
```bash
# Sauvegarder le fichier de configuration SSH
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup.$(date +%Y%m%d)
```

### 4.2 Configuration sécurisée de SSH
```bash
# Éditer le fichier de configuration
sudo nano /etc/ssh/sshd_config
```

**Configuration recommandée :**
```bash
# Port SSH (changez 22 vers un port personnalisé pour plus de sécurité)
Port 2222

# Protocole SSH (version 2 uniquement)
Protocol 2

# Authentification par clés uniquement
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Désactiver l'authentification par mot de passe
PasswordAuthentication no
PermitEmptyPasswords no

# Désactiver l'authentification root directe
PermitRootLogin no

# Limiter les utilisateurs autorisés
AllowUsers votre_utilisateur

# Paramètres de sécurité
ClientAliveInterval 300
ClientAliveCountMax 2
MaxAuthTries 3
MaxStartups 2

# Désactiver la résolution DNS inverse
UseDNS no

# Protocoles de chiffrement sécurisés
Ciphers aes256-gcm@openssh.com,chacha20-poly1305@openssh.com,aes256-ctr
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512

# Bannière de connexion
Banner /etc/ssh/banner
```

### 4.3 Création d'une bannière de sécurité
```bash
# Créer un fichier de bannière
sudo nano /etc/ssh/banner
```

**Contenu de la bannière :**
```
********************************************************
*                    ATTENTION                         *
*                                                      *
*  Accès restreint aux utilisateurs autorisés         *
*  Toutes les connexions sont enregistrées            *
*  Usage non autorisé strictement interdit            *
*                                                      *
********************************************************
```

### 4.4 Validation et redémarrage SSH
```bash
# Tester la configuration SSH
sudo sshd -t

# Si pas d'erreur, redémarrer SSH
sudo systemctl restart ssh

# Vérifier le nouveau statut
sudo systemctl status ssh
```

---

## 🔥 ÉTAPE 5 : Configuration du Firewall UFW

### 5.1 Installation et configuration UFW
```bash
# Installer UFW si non présent
sudo apt install ufw -y

# Politique par défaut
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Autoriser le nouveau port SSH (remplacez 2222 par votre port)
sudo ufw allow 2222/tcp

# Autoriser les ports web si nécessaire
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activer UFW
sudo ufw enable

# Vérifier les règles
sudo ufw status verbose
```

### 5.2 Configuration avancée de sécurité
```bash
# Limiter les tentatives de connexion SSH
sudo ufw limit 2222/tcp

# Bloquer les adresses IP suspectes (exemple)
# sudo ufw deny from 192.168.1.100

# Voir les logs UFW
sudo tail -f /var/log/ufw.log
```

---

## 🧪 ÉTAPE 6 : Tests Complets de Connectivité

### 6.1 Test de connexion SSH avec clés
```bash
# Depuis votre machine locale
ssh -p 2222 -i ~/.ssh/id_rsa utilisateur@VOTRE_IP_VPS

# Test verbose pour debugging
ssh -p 2222 -v utilisateur@VOTRE_IP_VPS
```

### 6.2 Vérifications de sécurité sur le serveur
```bash
# Vérifier les connexions actives
who
w

# Vérifier les logs SSH
sudo tail -f /var/log/auth.log

# Vérifier les tentatives de connexion
sudo grep "Failed password" /var/log/auth.log

# Vérifier les connexions réussies
sudo grep "Accepted publickey" /var/log/auth.log
```

### 6.3 Tests de sécurité
```bash
# Tester depuis une autre IP (doit échouer sans clés)
ssh -p 2222 utilisateur@VOTRE_IP_VPS

# Vérifier que l'authentification par mot de passe est désactivée
# (doit afficher "Permission denied (publickey)")
```

---

## 📊 ÉTAPE 7 : Monitoring et Surveillance

### 7.1 Configuration des logs détaillés
```bash
# Modifier le niveau de log SSH dans /etc/ssh/sshd_config
sudo nano /etc/ssh/sshd_config

# Ajouter ou modifier :
LogLevel VERBOSE

# Redémarrer SSH
sudo systemctl restart ssh
```

### 7.2 Scripts de surveillance
```bash
# Script de surveillance des connexions SSH
sudo nano /usr/local/bin/ssh-monitor.sh
```

**Contenu du script :**
```bash
#!/bin/bash
# Script de surveillance SSH

echo "=== SSH Connection Monitor ==="
echo "Date: $(date)"
echo

echo "=== Active SSH Sessions ==="
who | grep pts

echo
echo "=== Recent SSH Connections ==="
tail -20 /var/log/auth.log | grep sshd

echo
echo "=== Failed SSH Attempts ==="
grep "Failed password" /var/log/auth.log | tail -10

echo
echo "=== SSH Service Status ==="
systemctl status ssh --no-pager
```

```bash
# Rendre le script exécutable
sudo chmod +x /usr/local/bin/ssh-monitor.sh

# Exécuter le monitoring
sudo /usr/local/bin/ssh-monitor.sh
```

---

## 🔍 ÉTAPE 8 : Vérifications Finales et Check-list

### 8.1 Check-list de sécurité
```bash
# ✅ Vérifier que SSH fonctionne sur le nouveau port
sudo netstat -tlnp | grep :2222

# ✅ Vérifier que l'ancien port 22 est fermé
sudo netstat -tlnp | grep :22

# ✅ Tester la connexion par clés
ssh -p 2222 utilisateur@VOTRE_IP_VPS "echo 'SSH fonctionne!'"

# ✅ Vérifier que l'authentification par mot de passe est désactivée
sudo grep "PasswordAuthentication no" /etc/ssh/sshd_config

# ✅ Vérifier les règles firewall
sudo ufw status numbered

# ✅ Vérifier les logs de sécurité
sudo tail -20 /var/log/auth.log
```

### 8.2 Tests de performance SSH
```bash
# Test de vitesse de connexion
time ssh -p 2222 utilisateur@VOTRE_IP_VPS exit

# Test de transfert de fichiers
scp -P 2222 test.txt utilisateur@VOTRE_IP_VPS:~/
```

---

## 🚨 ÉTAPE 9 : Procédures d'Urgence

### 9.1 Accès de secours
```bash
# En cas de blocage SSH, accès par console VPS
# Vérifier la configuration
sudo sshd -t

# Réinitialiser la configuration SSH
sudo cp /etc/ssh/sshd_config.backup.YYYYMMDD /etc/ssh/sshd_config
sudo systemctl restart ssh
```

### 9.2 Déblocage d'urgence
```bash
# Réinitialiser UFW en cas de blocage
sudo ufw --force reset
sudo ufw allow 22/tcp
sudo ufw enable

# Vérifier les connexions bloquées
sudo iptables -L
```

---

## 📋 RÉSUMÉ DE L'INSTALLATION

### Configuration finale obtenue :
- ✅ **SSH sécurisé** sur port personnalisé (2222)
- ✅ **Authentification par clés uniquement**
- ✅ **Firewall UFW configuré**
- ✅ **Logs de sécurité activés**
- ✅ **Bannière de sécurité**
- ✅ **Monitoring des connexions**

### Commandes de vérification quotidiennes :
```bash
# Statut complet SSH
sudo systemctl status ssh

# Monitoring des connexions
sudo /usr/local/bin/ssh-monitor.sh

# Vérification firewall
sudo ufw status

# Logs de sécurité
sudo tail -20 /var/log/auth.log
```

---

## 🎯 CONNEXION FINALE

**Pour vous connecter à votre VPS :**
```bash
ssh -p 2222 -i ~/.ssh/id_rsa utilisateur@VOTRE_IP_VPS
```

**Votre SSH est maintenant :**
- 🔐 **100% sécurisé** avec authentification par clés
- 🛡️ **Protégé** par firewall et monitoring
- 📊 **Surveillé** avec logs détaillés
- ⚡ **Optimisé** pour les performances

**Installation SSH terminée avec succès ! 🚀**