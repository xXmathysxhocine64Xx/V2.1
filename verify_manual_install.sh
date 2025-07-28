#!/bin/bash

# Script de Vérification - Installation Manuelle WebCraft
# Vérifie que chaque étape de l'installation manuelle est correcte

set -e

echo "🔍 VÉRIFICATION INSTALLATION MANUELLE WEBCRAFT"
echo "=============================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

check_command() {
    if command -v "$1" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $1 installé${NC}"
        $1 --version 2>/dev/null || echo "   Version détectée"
    else
        echo -e "${RED}❌ $1 manquant${NC}"
        return 1
    fi
}

check_service() {
    if systemctl is-active --quiet "$1"; then
        echo -e "${GREEN}✅ Service $1 actif${NC}"
    else
        echo -e "${RED}❌ Service $1 inactif${NC}"
    fi
}

check_port() {
    if netstat -tlnp | grep -q ":$1 "; then
        echo -e "${GREEN}✅ Port $1 ouvert${NC}"
    else
        echo -e "${RED}❌ Port $1 fermé${NC}"
    fi
}

check_file() {
    if [[ -f "$1" ]]; then
        echo -e "${GREEN}✅ Fichier $1 présent${NC}"
    else
        echo -e "${RED}❌ Fichier $1 manquant${NC}"
    fi
}

check_dir() {
    if [[ -d "$1" ]]; then
        echo -e "${GREEN}✅ Dossier $1 présent${NC}"
    else
        echo -e "${RED}❌ Dossier $1 manquant${NC}"
    fi
}

echo
echo "📋 1. VÉRIFICATION DES DÉPENDANCES SYSTÈME"
echo "----------------------------------------"
check_command "python3"
check_command "node"
check_command "npm"
check_command "yarn"
check_command "nginx"
check_command "certbot"
check_command "pm2"
check_command "ufw"

echo
echo "📋 2. VÉRIFICATION DES SERVICES"
echo "------------------------------"
check_service "nginx"
check_service "ufw"

echo
echo "📋 3. VÉRIFICATION DES PORTS"
echo "---------------------------"
check_port "80"
check_port "443"
check_port "8001"

echo
echo "📋 4. VÉRIFICATION STRUCTURE DE FICHIERS"
echo "---------------------------------------"
check_dir "/var/www/webcraft"
check_dir "/var/www/webcraft/backend"
check_dir "/var/www/webcraft/frontend"
check_dir "/var/log/webcraft"
check_dir "/var/backups/webcraft"

echo
echo "📋 5. VÉRIFICATION FICHIERS DE CONFIGURATION"
echo "--------------------------------------------"
check_file "/var/www/webcraft/backend/.env"
check_file "/var/www/webcraft/frontend/.env"
check_file "/var/www/webcraft/ecosystem.config.js"
check_file "/etc/nginx/sites-available/webcraft"
check_file "/usr/local/bin/webcraft-status"
check_file "/usr/local/bin/webcraft-backup"

echo
echo "📋 6. VÉRIFICATION APPLICATION"
echo "-----------------------------"
check_file "/var/www/webcraft/backend/server.py"
check_file "/var/www/webcraft/backend/requirements.txt"
check_file "/var/www/webcraft/backend/webcraft.db"
check_dir "/var/www/webcraft/backend/venv"
check_dir "/var/www/webcraft/frontend/build"
check_file "/var/www/webcraft/frontend/package.json"

echo
echo "📋 7. TESTS DE CONNECTIVITÉ"
echo "--------------------------"

# Test backend direct
if curl -s http://localhost:8001/api/ > /dev/null; then
    echo -e "${GREEN}✅ Backend accessible (port 8001)${NC}"
else
    echo -e "${RED}❌ Backend non accessible${NC}"
fi

# Test frontend via Nginx
if curl -s -I http://localhost/ | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Frontend accessible via Nginx${NC}"
else
    echo -e "${RED}❌ Frontend non accessible${NC}"
fi

# Test PM2
if pm2 status | grep -q "webcraft-backend"; then
    echo -e "${GREEN}✅ PM2 backend configuré${NC}"
    pm2 status webcraft-backend
else
    echo -e "${RED}❌ PM2 backend non configuré${NC}"
fi

echo
echo "📋 8. VÉRIFICATION SÉCURITÉ"
echo "--------------------------"

# UFW status
if ufw status | grep -q "Status: active"; then
    echo -e "${GREEN}✅ Firewall UFW actif${NC}"
    ufw status | grep -E "(22|80|443)"
else
    echo -e "${RED}❌ Firewall UFW inactif${NC}"
fi

# SSL Certificate
if [[ -d "/etc/letsencrypt/live" ]] && [[ $(ls /etc/letsencrypt/live/ | wc -l) -gt 0 ]]; then
    echo -e "${GREEN}✅ Certificat SSL configuré${NC}"
    certbot certificates | head -10
else
    echo -e "${YELLOW}⚠️ Certificat SSL non configuré (normal si domaine non configuré)${NC}"
fi

echo
echo "📋 9. INFORMATIONS SYSTÈME"
echo "------------------------"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Espace disque: $(df -h /var/www/webcraft | tail -1 | awk '{print $4}') disponible"
echo "Mémoire: $(free -h | grep Mem | awk '{print $7}') disponible"
echo "Charge système: $(uptime | awk -F'load average:' '{print $2}')"

echo
echo "📋 10. RÉSUMÉ DES LOGS"
echo "--------------------"
if [[ -f "/var/log/webcraft/backend.log" ]]; then
    echo "Dernières lignes du log backend:"
    tail -5 /var/log/webcraft/backend.log
else
    echo "Logs backend non trouvés"
fi

echo
echo "🎯 COMMANDES DE TEST MANUELLES"
echo "=============================="
echo "# Tester l'API:"
echo "curl http://localhost:8001/api/"
echo
echo "# Voir les logs PM2:"
echo "pm2 logs webcraft-backend --lines 20"
echo
echo "# Status complet:"
echo "webcraft-status"
echo
echo "# Backup:"
echo "webcraft-backup"

echo
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}    VÉRIFICATION TERMINÉE !           ${NC}"
echo -e "${BLUE}======================================${NC}"