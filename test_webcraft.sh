#!/bin/bash
# Test rapide de l'installation WebCraft

echo "🧪 Test de l'installation WebCraft"
echo "=================================="

# Variables
DOMAIN="localhost"
if [ ! -z "$1" ]; then
    DOMAIN="$1"
fi

echo "🌐 Test du domaine: $DOMAIN"
echo ""

# Test 1: Backend API
echo "1. 🔧 Test du backend..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN:8001/api/ 2>/dev/null || echo "000")
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "   ✅ Backend API accessible"
else
    echo "   ❌ Backend non accessible (code: $BACKEND_STATUS)"
fi

# Test 2: Frontend  
echo "2. 🎨 Test du frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN/ 2>/dev/null || echo "000")
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend accessible"
else
    echo "   ❌ Frontend non accessible (code: $FRONTEND_STATUS)"
fi

# Test 3: SSL (si HTTPS)
if [[ $DOMAIN != "localhost" ]]; then
    echo "3. 🔒 Test SSL..."
    SSL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/ 2>/dev/null || echo "000")
    if [ "$SSL_STATUS" = "200" ]; then
        echo "   ✅ SSL fonctionnel"
    else
        echo "   ❌ SSL non accessible (code: $SSL_STATUS)"
    fi
fi

# Test 4: API Contact
echo "4. 📧 Test de l'API de contact..."
CONTACT_TEST=$(curl -s -X POST "http://$DOMAIN:8001/api/contact" \
-H "Content-Type: application/json" \
-d '{"name":"Test","email":"test@test.com","message":"Test"}' 2>/dev/null)

if [[ $CONTACT_TEST == *"id"* ]]; then
    echo "   ✅ API de contact fonctionnelle"
else
    echo "   ❌ Problème avec l'API de contact"
fi

echo ""
echo "🎯 Résumé du test"
echo "================="
if [ "$BACKEND_STATUS" = "200" ] && [ "$FRONTEND_STATUS" = "200" ]; then
    echo "✅ Installation WebCraft réussie !"
    echo "🌐 Site accessible sur: http://$DOMAIN"
    if [[ $DOMAIN != "localhost" ]]; then
        echo "🔒 SSL: https://$DOMAIN"
    fi
else
    echo "❌ Problèmes détectés - Vérifiez l'installation"
fi