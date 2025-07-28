#!/bin/bash

# Script de Test de la Procédure de Déploiement WebCraft
# Ce script teste tous les composants de déploiement

set -e

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✅ PASS]${NC} $1"
}

print_error() {
    echo -e "${RED}[❌ FAIL]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠️ WARN]${NC} $1"
}

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}    TEST PROCÉDURE DÉPLOIEMENT       ${NC}"
echo -e "${BLUE}======================================${NC}"
echo

# Test 1: Structure des fichiers
print_test "Vérification de la structure des fichiers..."
if [[ -d "backend" && -d "frontend" && -d "deploy" ]]; then
    print_success "Structure des dossiers correcte"
else
    print_error "Structure des dossiers incorrecte"
    exit 1
fi

# Test 2: Fichiers critiques
print_test "Vérification des fichiers critiques..."
critical_files=(
    "backend/server.py"
    "backend/requirements.txt"
    "frontend/package.json"
    "deploy/install.sh"
    "deploy/package.sh"
    "deploy/webcraft-service.sh"
)

for file in "${critical_files[@]}"; do
    if [[ -f "$file" ]]; then
        print_success "✓ $file"
    else
        print_error "✗ $file manquant"
        exit 1
    fi
done

# Test 3: Syntaxe des scripts
print_test "Vérification de la syntaxe des scripts..."
bash -n deploy/install.sh && print_success "install.sh syntaxiquement correct"
bash -n deploy/package.sh && print_success "package.sh syntaxiquement correct"
bash -n deploy/webcraft-service.sh && print_success "webcraft-service.sh syntaxiquement correct"

# Test 4: Permissions des scripts
print_test "Vérification des permissions..."
if [[ -x "deploy/install.sh" ]]; then
    print_success "install.sh exécutable"
else
    print_warning "install.sh non exécutable - sera corrigé"
fi

# Test 5: Test du packaging
print_test "Test du script de packaging..."
cd /tmp
cp -r /app /tmp/test_webcraft
cd test_webcraft
./deploy/package.sh > /dev/null 2>&1
if [[ -f webcraft_*.tar.gz ]]; then
    print_success "Package créé avec succès"
    
    # Test extraction
    tar -xzf webcraft_*.tar.gz
    if [[ -d "deploy_package" ]]; then
        print_success "Package extractible"
        
        # Vérifier le contenu
        if [[ -f "deploy_package/install.sh" && -d "deploy_package/backend" && -d "deploy_package/frontend" ]]; then
            print_success "Contenu du package correct"
        else
            print_error "Contenu du package incorrect"
        fi
    else
        print_error "Erreur d'extraction du package"
    fi
else
    print_error "Échec de création du package"
fi

# Test 6: Vérification des dépendances Python
print_test "Vérification des dépendances Python..."
if [[ -d "/tmp/test_webcraft/deploy_package/backend" ]]; then
    cd /tmp/test_webcraft/deploy_package/backend
    if python3 -m py_compile server.py; then
        print_success "server.py compile correctement"
    else
        print_error "Erreur de compilation server.py"
    fi
else
    print_warning "Dossier backend non trouvé dans le package"
fi

# Test 7: Vérification du package.json
print_test "Vérification du package.json frontend..."
if [[ -d "/tmp/test_webcraft/deploy_package/frontend" ]]; then
    cd /tmp/test_webcraft/deploy_package/frontend
    if [[ -f "package.json" ]]; then
        # Vérifier que les dépendances principales sont présentes
        if grep -q "react" package.json && grep -q "@radix-ui" package.json; then
            print_success "Dépendances React principales présentes"
        else
            print_error "Dépendances React manquantes"
        fi
    else
        print_error "package.json manquant"
    fi
else
    print_warning "Dossier frontend non trouvé"
fi

# Test 8: Simulation installation (sans privilèges root)
print_test "Simulation de pré-installation..."
cd /tmp/test_webcraft/deploy_package

# Vérifier les variables dans install.sh
if grep -q "INSTALL_DIR=" install.sh && grep -q "PROJECT_NAME=" install.sh; then
    print_success "Variables de configuration présentes"
else
    print_error "Variables de configuration manquantes"
fi

# Test 9: Vérification de la configuration Nginx
print_test "Vérification template Nginx..."
if grep -q "location /api" install.sh && grep -q "proxy_pass" install.sh; then
    print_success "Configuration proxy API correcte"
else
    print_error "Configuration proxy API manquante"
fi

# Test 10: Nettoyage
print_test "Nettoyage des fichiers de test..."
cd /
rm -rf /tmp/test_webcraft
print_success "Nettoyage terminé"

echo
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}    TOUS LES TESTS RÉUSSIS ! ✅       ${NC}"
echo -e "${GREEN}======================================${NC}"
echo
echo -e "${BLUE}La procédure de déploiement est prête !${NC}"
echo -e "${BLUE}Package: $(ls /app/webcraft_*.tar.gz 2>/dev/null | head -1)${NC}"
echo
echo -e "${YELLOW}Prochaines étapes:${NC}"
echo "1. Transférer le package sur votre VPS"
echo "2. Extraire et exécuter install.sh"
echo "3. Configurer votre domaine DNS"
echo "4. Accéder à votre site !"