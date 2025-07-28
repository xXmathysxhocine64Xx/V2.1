#!/bin/bash

# 🚀 WebCraft - Déploiement Express
# Usage: ./quick-deploy.sh VOTRE_IP_VPS

if [ -z "$1" ]; then
    echo "Usage: ./quick-deploy.sh VOTRE_IP_VPS"
    echo "Exemple: ./quick-deploy.sh 123.456.789.012"
    exit 1
fi

VPS_IP="$1"

echo "🚀 Déploiement WebCraft Express vers $VPS_IP"
echo "============================================"

# 1. Créer le package
echo "📦 Création du package..."
./deploy/package.sh

# 2. Transférer vers VPS
echo "📤 Transfert vers VPS..."
PACKAGE=$(ls webcraft_*.tar.gz | head -1)
scp "$PACKAGE" root@$VPS_IP:/tmp/

# 3. Installation automatique via SSH
echo "⚙️ Installation sur VPS..."
ssh root@$VPS_IP "cd /tmp && tar -xzf $PACKAGE && cd deploy_package && ./install.sh"

echo "✅ Déploiement terminé !"
echo "🌐 Configurez votre DNS puis accédez à votre site"