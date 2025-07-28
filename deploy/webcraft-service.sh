#!/bin/bash

# Script de gestion des services WebCraft
# Usage: ./webcraft-service.sh [start|stop|restart|status|logs]

set -e

# Configuration
PROJECT_DIR="/var/www/webcraft"
SERVICE_NAME="webcraft-backend"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Fonction pour vérifier le statut
check_status() {
    print_status "Vérification du statut des services..."
    
    echo -e "\n${YELLOW}=== Backend (PM2) ===${NC}"
    pm2 status $SERVICE_NAME 2>/dev/null || echo "Service non trouvé"
    
    echo -e "\n${YELLOW}=== Nginx ===${NC}"
    systemctl status nginx --no-pager -l | head -10
    
    echo -e "\n${YELLOW}=== Database ===${NC}"
    if [[ -f "$PROJECT_DIR/backend/webcraft.db" ]]; then
        ls -la "$PROJECT_DIR/backend/webcraft.db"
        echo "Database size: $(du -h "$PROJECT_DIR/backend/webcraft.db" | cut -f1)"
    else
        print_error "Database non trouvée"
    fi
    
    echo -e "\n${YELLOW}=== Ports ===${NC}"
    netstat -tlnp | grep :8001 || echo "Port 8001 non ouvert"
    netstat -tlnp | grep :80 || echo "Port 80 non ouvert"
    netstat -tlnp | grep :443 || echo "Port 443 non ouvert"
}

# Fonction pour démarrer les services
start_services() {
    print_status "Démarrage des services..."
    
    # Démarrage du backend
    cd "$PROJECT_DIR"
    pm2 start ecosystem.config.js || print_error "Impossible de démarrer le backend"
    
    # Démarrage/redémarrage de Nginx
    systemctl start nginx || print_error "Impossible de démarrer Nginx"
    
    print_success "Services démarrés"
}

# Fonction pour arrêter les services
stop_services() {
    print_status "Arrêt des services..."
    
    # Arrêt du backend
    pm2 stop $SERVICE_NAME || print_warning "Backend déjà arrêté"
    
    print_success "Services arrêtés"
}

# Fonction pour redémarrer les services
restart_services() {
    print_status "Redémarrage des services..."
    
    # Redémarrage du backend
    pm2 restart $SERVICE_NAME || print_error "Impossible de redémarrer le backend"
    
    # Rechargement de Nginx
    systemctl reload nginx || print_error "Impossible de recharger Nginx"
    
    print_success "Services redémarrés"
}

# Fonction pour afficher les logs
show_logs() {
    echo -e "${YELLOW}=== Logs Backend ===${NC}"
    pm2 logs $SERVICE_NAME --lines 20
    
    echo -e "\n${YELLOW}=== Logs Nginx (Access) ===${NC}"
    tail -20 /var/log/nginx/webcraft_access.log
    
    echo -e "\n${YELLOW}=== Logs Nginx (Error) ===${NC}"
    tail -20 /var/log/nginx/webcraft_error.log
}

# Fonction pour tester la connectivité
test_connectivity() {
    print_status "Test de connectivité..."
    
    # Test backend
    if curl -s http://localhost:8001/api/ > /dev/null; then
        print_success "Backend accessible"
    else
        print_error "Backend non accessible"
    fi
    
    # Test Nginx
    if curl -s -I http://localhost/ > /dev/null; then
        print_success "Nginx accessible"
    else
        print_error "Nginx non accessible"
    fi
    
    # Test SSL (si configuré)
    if [[ -f /etc/letsencrypt/live/*/fullchain.pem ]]; then
        DOMAIN=$(ls /etc/letsencrypt/live/ | head -1)
        if curl -s -I https://$DOMAIN/ > /dev/null; then
            print_success "SSL accessible"
        else
            print_error "SSL non accessible"
        fi
    fi
}

# Menu principal
case "${1:-status}" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    status)
        check_status
        ;;
    logs)
        show_logs
        ;;
    test)
        test_connectivity
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|test}"
        echo ""
        echo "Commands:"
        echo "  start   - Démarrer tous les services"
        echo "  stop    - Arrêter tous les services"
        echo "  restart - Redémarrer tous les services"
        echo "  status  - Afficher le statut des services"
        echo "  logs    - Afficher les logs"
        echo "  test    - Tester la connectivité"
        exit 1
        ;;
esac

exit 0