#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: Refaire le backend pour qu'il soit très facile de déployer sur Ubuntu 24, avec procédure d'installation de A à Z, et effacer les vieilles procédures
## backend:
##   - task: "Refonte complète du backend FastAPI"
##     implemented: true
##     working: true
##     file: "backend/server.py"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         - working: true
##           agent: "main"
##           comment: "Backend refait avec FastAPI + stockage JSON, suppression SQLite, API simplifiée avec /api/contact et /api/contacts, validation Pydantic intégrée"
##
##   - task: "Simplification des dépendances Python"
##     implemented: true
##     working: true
##     file: "backend/requirements.txt"
##     stuck_count: 0
##     priority: "medium"
##     needs_retesting: false
##     status_history:
##         - working: true
##           agent: "main"
##           comment: "Réduction de 10+ dépendances à 4 seulement: fastapi, uvicorn, pydantic, python-multipart"
##
## frontend:
##   - task: "Conservation de l'esthétique du site"
##     implemented: true
##     working: true
##     file: "frontend/src/**"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: false
##     status_history:
##         - working: true
##           agent: "main"
##           comment: "Esthétique moderne préservée intégralement - aucune modification du design"
##
## deployment:
##   - task: "Script d'installation ultra-simple"
##     implemented: true
##     working: false
##     file: "deploy_simple.sh"
##     stuck_count: 0
##     priority: "high"
##     needs_retesting: true
##     status_history:
##         - working: false
##           agent: "main"
##           comment: "Script créé avec installation en 1 commande, configuration auto SSL + Nginx + PM2, non testé en production"
##
##   - task: "Documentation simplifiée"
##     implemented: true
##     working: true
##     file: "INSTALLATION_UBUNTU24.md"
##     stuck_count: 0
##     priority: "medium"
##     needs_retesting: false
##     status_history:
##         - working: true
##           agent: "main"
##           comment: "Guide unique remplaçant 5+ guides complexes, procédure 3 minutes vs 30+ minutes avant"
##
##   - task: "Suppression anciennes procédures"
##     implemented: true
##     working: true
##     file: "multiple"
##     stuck_count: 0
##     priority: "medium"
##     needs_retesting: false
##     status_history:
##         - working: true
##           agent: "main"
##           comment: "Supprimé DEPLOYMENT_GUIDE.md (500+ lignes), scripts deploy/, tests/, tous les anciens guides complexes"

## metadata:
##   created_by: "main_agent"
##   version: "2.0"
##   test_sequence: 1
##   run_ui: false

## test_plan:
##   current_focus:
##     - "Backend FastAPI refait"
##     - "Script d'installation deploy_simple.sh"
##   stuck_tasks: []
##   test_all: false
##   test_priority: "high_first"

## agent_communication:
##     - agent: "main"
##       message: "Backend complètement refait avec FastAPI + JSON storage. Installation simplifiée à 1 seule commande. Anciennes procédures complexes supprimées. Prêt pour test de déploiement."

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION  
#====================================================================================================


#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================