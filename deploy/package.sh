#!/bin/bash

# Script pour packager WebCraft pour le déploiement
# Ce script crée une archive prête à être transférée sur votre VPS

set -e

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Variables
PROJECT_NAME="webcraft"
DEPLOY_DIR="deploy_package"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="${PROJECT_NAME}_${TIMESTAMP}.tar.gz"

print_status "Création du package de déploiement WebCraft..."

# Nettoyage et création du répertoire de packaging
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copie des fichiers backend
print_status "Copie des fichiers backend..."
mkdir -p $DEPLOY_DIR/backend
cp -r backend/* $DEPLOY_DIR/backend/
# Exclusion des fichiers non nécessaires
rm -rf $DEPLOY_DIR/backend/__pycache__
rm -rf $DEPLOY_DIR/backend/*.pyc
rm -rf $DEPLOY_DIR/backend/venv
rm -f $DEPLOY_DIR/backend/webcraft.db

# Copie des fichiers frontend
print_status "Copie des fichiers frontend..."
mkdir -p $DEPLOY_DIR/frontend
cp -r frontend/* $DEPLOY_DIR/frontend/
# Exclusion des fichiers non nécessaires
rm -rf $DEPLOY_DIR/frontend/node_modules
rm -rf $DEPLOY_DIR/frontend/build
rm -rf $DEPLOY_DIR/frontend/.next

# Copie des fichiers de déploiement
print_status "Copie des fichiers de déploiement..."
mkdir -p $DEPLOY_DIR/deploy
cp deploy/install.sh $DEPLOY_DIR/
cp deploy/README.md $DEPLOY_DIR/
chmod +x $DEPLOY_DIR/install.sh

# Création du fichier de version
cat > $DEPLOY_DIR/VERSION << EOF
WebCraft v1.0.0
Build: $TIMESTAMP
Date: $(date)
EOF

# Création de l'archive
print_status "Création de l'archive..."
tar -czf $PACKAGE_NAME $DEPLOY_DIR

# Nettoyage
rm -rf $DEPLOY_DIR

print_success "Package créé: $PACKAGE_NAME"
echo ""
echo -e "${GREEN}=== Instructions de déploiement ===${NC}"
echo "1. Transférez le fichier $PACKAGE_NAME sur votre VPS:"
echo "   scp $PACKAGE_NAME root@votre-ip:/tmp/"
echo ""
echo "2. Connectez-vous à votre VPS et exécutez:"
echo "   cd /tmp"
echo "   tar -xzf $PACKAGE_NAME"
echo "   cd $DEPLOY_DIR"
echo "   ./install.sh"
echo ""
echo -e "${BLUE}Le package est prêt pour le déploiement !${NC}"